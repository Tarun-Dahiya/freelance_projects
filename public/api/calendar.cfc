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

<cffunction  name="getEvents" access="remote" output="yes">

    <cfparam name="form.offset" default="0">
    <cfset StartDay = dateformat(dateadd("m",form.offset,now()),"m/1/yyyy")>
    <cfset EndDay = "#month(startday)#/#daysinmonth(startday)#/#year(startday)#">
    <cfset DayCount = daysinmonth(startday)>
    <cfset StartDayofWeek = dayofweek(StartDay)>
    <cfset StartEmptyCells = StartDayOfWeek-1>
    <cfset daylist = "Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday">

    <cftransaction isolation="read_uncommitted">

        <cfquery datasource="corporate" name="Types">
            Select assettype from Asset_members group by assettype order by assettype
        </cfquery>
        <cfquery datasource="corporate" name="Facility">
            Select homefacility from Asset_members group by homefacility order by homefacility
        </cfquery>
        <cfquery datasource="corporate" name="a">
            Select assetid,assettype,homefacility,assetname from asset_members where status IN ('Free','Available')
        </cfquery>

        <cfquery datasource="corporate" name="events">
            Select 
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
            from 
            Asset_Schedule 
            INNER JOIN
            Asset_Members ON
            Asset_Schedule.assetid = Asset_Members.assetid
            where
            (
            startdate >= '#StartDay#' AND startdate < '#dateformat(dateadd("d",1,endday),"mm/dd/yyyy")#'
            )
            OR
            (
            enddate >= '#StartDay#' AND enddate < '#dateformat(dateadd("d",1,endday),"mm/dd/yyyy")#'
            )
        </cfquery>
    </cftransaction>
    <cfoutput>#serializeJSON(events, "struct")#</cfoutput>
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

</cfcomponent>