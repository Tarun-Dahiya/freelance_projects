<cfcomponent>
<!--- include webservices wide security functions --->
  <cfinclude template='/webservices/auth/apiFiles/Security/objectSecurity.cfc'>
  <cfinclude template='/webservices/auth/apiFiles/Security/CSRF.cfc'>

<!--- include app level utility functions --->
  <cfinclude template='./system/functions.cfc'>

<cftransaction isolation='read_uncommitted' >
  <cfquery name='getSiteParams' datasource='WebUsers' >
    SELECT     
      ParamName, ParamValue 
      FROM 
          PortalParams
      WHERE
          ( ParamType = 'Site' )
  </cfquery>
</cftransaction>

<cfloop query="getSiteParams" >
    <cfset "session.#getSiteParams.ParamName#" =  "#getSiteParams.ParamValue#"> 
</cfloop>

<cffunction name="getEvents" access="remote" output="yes">
    
    <cfparam name="form.offset" default="0">
    <cfset StartDay = dateformat(dateadd("m", form.offset, now()), "m/1/yyyy")>
    <cfset EndDay = "#month(StartDay)#/#daysinmonth(StartDay)#/#year(StartDay)#">
    <cfset DayCount = daysinmonth(StartDay)>
    <cfset StartDayofWeek = dayofweek(StartDay)>
    <cfset StartEmptyCells = StartDayofWeek - 1>
    <cfset daylist = "Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday">

    <cftransaction isolation="read_uncommitted">

        <cfquery datasource="corporate" name="Types">
            SELECT assettype 
            FROM Asset_Members 
            GROUP BY assettype 
            ORDER BY assettype
        </cfquery>
        
        <cfquery datasource="corporate" name="Facility">
            SELECT homefacility 
            FROM Asset_Members 
            GROUP BY homefacility 
            ORDER BY homefacility
        </cfquery>
        
        <cfquery datasource="corporate" name="a">
            SELECT assetid, assettype, homefacility, assetname 
            FROM Asset_Members 
            WHERE status IN ('Free', 'Available')
        </cfquery>

            <cfquery datasource="corporate" name="events">
                SELECT 
                    Asset_Schedule.eventid,
                    Asset_Schedule.who,
                    Asset_Schedule.attendees,
                    Asset_Schedule.location,
                    Asset_Schedule.startdate,
                    Asset_Schedule.enddate,
                    Asset_Schedule.eventnote,
                    Asset_Schedule.assetid,
                    Asset_Members.assetname,
                    Asset_Members.assettype,
                    Asset_Members.HomeFacility
                FROM 
                    Asset_Schedule 
                INNER JOIN
                    Asset_Members 
                ON
                    Asset_Schedule.assetid = Asset_Members.assetid
                WHERE
                (
                startdate >= <cfqueryparam value="#StartDay#" cfsqltype="cf_sql_date"> 
                AND startdate < <cfqueryparam value="#dateformat(dateadd('d',1,EndDay), 'yyyy-mm-dd')#" cfsqltype="cf_sql_date">
                )
                OR
                (
                enddate >= <cfqueryparam value="#StartDay#" cfsqltype="cf_sql_date"> 
                AND enddate < <cfqueryparam value="#dateformat(dateadd('d',1,EndDay), 'yyyy-mm-dd')#" cfsqltype="cf_sql_date">
                )
            </cfquery>

    </cftransaction>

    <cfoutput>#serializeJSON(events, "struct")#</cfoutput>

</cffunction>

<cffunction name="getEventByID" access="remote" output="yes">
    <cfset eventid = ''>

    <cfif isDefined('params.data')>
        <cfset eventid = params.data.eventid>
    </cfif>

    <cftransaction isolation='read_uncommitted'>
        <cfquery name='getEvent' datasource='corporate'>

             SELECT 
                    Asset_Schedule.eventid,
                    Asset_Schedule.who,
                    Asset_Schedule.attendees,
                    Asset_Schedule.location,
                    Asset_Schedule.startdate,
                    Asset_Schedule.enddate,
                    Asset_Schedule.eventnote,
                    Asset_Schedule.assetid,
                    Asset_Members.assetname,
                    Asset_Members.assettype,
                    Asset_Members.HomeFacility
                FROM 
                    Asset_Schedule 
                INNER JOIN
                    Asset_Members 
                ON
                    Asset_Schedule.assetid = Asset_Members.assetid
                WHERE eventid = #eventid#
        </cfquery>
    </cftransaction>
    <cfoutput>#serializeJSON(getEvent, "struct")#</cfoutput>
</cffunction>

<cffunction name="getEventsByMonth" access="remote" output="yes">
    <cfset startDate = ''>
    <cfset endDate = ''>

    <cfif isDefined('params.data')>
        <cfset startDate = params.data.startDate>
        <cfset endDate = params.data.endDate>
    </cfif>

    
    <cftransaction isolation='read_uncommitted'>
        <cfquery name='getEvent' datasource='corporate'>
            SELECT 
                Asset_Schedule.eventid,
                Asset_Schedule.who,
                Asset_Schedule.attendees,
                Asset_Schedule.location,
                Asset_Schedule.startdate,
                Asset_Schedule.enddate,
                Asset_Schedule.eventnote,
                Asset_Schedule.assetid,
                Asset_Members.assetname,
                Asset_Members.assettype,
                Asset_Members.HomeFacility
            FROM 
                Asset_Schedule 
            INNER JOIN
                Asset_Members 
            ON
                Asset_Schedule.assetid = Asset_Members.assetid
            WHERE
            (
            startdate >= '#startDate#'
            AND startdate < '#endDate#'
            )
            OR
            (
            enddate >= '#startDate#'
            AND enddate < '#endDate#'
            )
        </cfquery>
    </cftransaction>
    <cfoutput>#serializeJSON(getEvent, "struct")#</cfoutput>
</cffunction>

<cffunction name="getAssetMembers" access="remote" output="yes">
    <cftransaction isolation="read_uncommitted">
        <cfquery datasource="corporate" name="getAssetMembers">
            Select assetname,assetid,assettype,homefacility,status from Asset_Members where status <> 'Retired' order by homefacility,assettype,assetname 
        </cfquery>
    </cftransaction>
    <cfoutput >#serializeJSON(getAssetMembers, "struct")#</cfoutput>
</cffunction>

<cffunction name="checkAvailability" access="remote" returntype="string">
    	
    <cfargument name="assetid" default="0">
    <cfargument name="startdate" default="">
    <cfargument name="starttime" default="">
    <cfargument name="enddate" default="">
    <cfargument name="endtime" default="">
    <cfargument name="eventid" default="">
    
    
    <cfset RS = "#arguments.startdate# #arguments.starttime#">
    <cfset RE = "#arguments.enddate# #arguments.endtime#">
    
    <cfquery datasource="Corporate" name="c">
        Select 
            Asset_Schedule.eventid
        from 
            Asset_Schedule 
        where
            assetid = #arguments.assetid#
            AND
            <cfif arguments.eventid neq "">
            eventid <> #arguments.eventid#
            AND
            </cfif>
            (
            (startdate BETWEEN '#RS#' AND '#RE#')
            OR
            (enddate BETWEEN '#RS#' AND '#RE#')
            OR
            (startdate <= '#RS#' AND enddate >= '#RE#')
            OR
            (startdate >= '#RS#' AND enddate <= '#RE#')
            )
    </cfquery>
    
    <cfif c.recordcount gt 0>
        <cfset returnme =  "Conflict with an existing event">
    <cfelse>
        <cfset returnme = "Available">
    </cfif>
    
    <cfif rs gt re>
        <cfset returnme = "Start Date can not be after the end date">
    </cfif>
    
    
    <cfreturn returnme>
    
</cffunction>

<cffunction  name="saveEvent" access="remote" output="yes">

    <cfargument name="assetid" default="0">
    <cfargument name="startdate" default="">
    <cfargument name="starttime" default="">
    <cfargument name="enddate" default="">
    <cfargument name="endtime" default="">
    <cfargument name="eventid" default="">
    <cfargument name="who" default="">
    <cfargument name="where" default="">
    <cfargument name="attendees" default="">
    <cfargument name="eventNotes" default="">

    <cfif arguments.eventid eq ''>
        <cfquery datasource="corporate">
            Insert into Asset_Schedule (assetid,startdate,enddate,who,location,eventnote, attendees)
            values
            (
            '#arguments.assetid#',
            '#arguments.startdate# #arguments.starttime#',
            '#arguments.enddate# #arguments.endtime#',
            '#arguments.who#',
            '#arguments.where#',
            '#arguments.eventNotes#',
            '#arguments.attendees#'
            )
        </cfquery>
    <cfelse>
    	<cfquery datasource="corporate">
			Update 
            	Asset_Schedule 
			SET
                assetid = #arguments.assetid#,
                startdate = '#arguments.startdate# #arguments.starttime#',
                enddate = '#arguments.enddate# #arguments.endtime#',
                who = '#arguments.who#',
                location = '#arguments.where#',
                eventnote = '#arguments.eventNotes#',
                attendees = '#arguments.attendees#'
            where 
            	eventid = #arguments.eventid#
        </cfquery>
    </cfif>
    <cfoutput>#serializeJSON({success: true}, "struct")#</cfoutput>
</cffunction>

<cffunction  name="deleteEvent" access="remote" output="yes">

    <cfset eventid = ''>

    <cfif isDefined('params.data')>
        <cfset eventid = params.data.eventid>
    </cfif>

    <cfquery datasource="corporate" name="deleteEv">
        Delete from Asset_Schedule where eventid = #eventid#
    </cfquery>
    
    <cfoutput>#serializeJSON({success: true}, "struct")#</cfoutput>

</cffunction>

<cffunction name="UpdateVal" access="remote" output="yes">
<!---     <cfargument name="assetid" default="0"> --->
<!---     <cfargument name="tablename" default="none"> --->
<!---     <cfargument name="col" default="none"> --->
<!---     <cfargument name="valtype" default="text"> --->
<!---     <cfargument name="value" default="0"> --->

    <cfset assetid = '0'>
    <cfset tablename = 'none'>
    <cfset col = 'none'>
    <cfset valtype = 'text'>
    <cfset value = '0'>

    <cfif isDefined('params.data')>
        <cfset assetid = params.data.assetid>
        <cfset tablename = params.data.tablename>
        <cfset col = params.data.col>
        <cfset valtype = params.data.valtype>
        <cfset value = params.data.value>
    </cfif>
    
    <cfquery datasource="corporate">
        Update 
            #tablename# 
        set 
            #col# = 
            <cfif trim(value) neq "">
                <cfswitch expression="#valtype#">
                    <cfcase value="text">'#trim(value)#'</cfcase>
                    <cfcase value="numeric">#value#</cfcase>
                </cfswitch>
            <cfelse>
                NULL
            </cfif>
        WHERE
            assetid = #assetid#
    </cfquery>
    
    <cfreturn col>
    
</cffunction>

</cfcomponent>