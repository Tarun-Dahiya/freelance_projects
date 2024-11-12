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

</cfcomponent>