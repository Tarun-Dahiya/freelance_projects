<cfcomponent>
<!--- include webservices wide security functions --->
    <cfinclude template = '..\..\..\auth\apiFiles\Security\objectSecurity.cfc'>
    <!---<cfinclude template = '../../../auth/apiFiles/Security/objectSecurity.cfc'>--->

<!--- include app level utility functions --->
    <cfinclude template = "../system/functions.cfc">


    <cffunction name="getNavMenu" access="remote" output="yes">
        <cfset topLevelChildren = getChildren(request.applicationId,0,'Menu')>

        <cfquery dbtype="query" name="getNavMenuId">
            select * from topLevelChildren where ObjectType='Menu' and ObjectName = 'NavMenu'
        </cfquery>

        <cfset navMenu = getChildren(request.applicationId,getNavMenuId.ObJectId)>
        <cfoutput>#serializeJSON(navMenu, "struct")#</cfoutput>
    </cffunction>

    <cffunction name="getSettingsItems" access="remote" output="yes">
        <cfset topLevelChildren = getChildren(request.applicationId,0,'AppItems')>
        <cfquery dbtype="query" name="getNavMenuId">
            select * from topLevelChildren where ObjectType='AppItems' and ObjectName = 'SettingsItems'
        </cfquery>
        <cfset navMenu = getChildren(request.applicationId,getNavMenuId.ObJectId)>
        <cfoutput>#serializeJSON(navMenu, "struct")#</cfoutput>
    </cffunction>

    <cffunction name="getMobileMenuItems" access="remote" output="yes">
        <cfset topLevelChildren = getChildren(request.applicationId,0,'Menu')>
        <cfquery dbtype="query" name="getNavMenuId">
            select * from topLevelChildren where ObjectType='Menu' and ObjectName = 'MobileMenuItems'
        </cfquery>
        <cfset navMenu = getChildren(request.applicationId,getNavMenuId.ObJectId)>
        <cfoutput>#serializeJSON(navMenu, "struct")#</cfoutput>
    </cffunction>

    <cffunction name="getReportItems" access="remote" output="yes">
        <cfset topLevelChildren = getChildren(request.applicationId,0,'Menu')>
        <cfquery dbtype="query" name="getNavMenuId">
            select * from topLevelChildren where ObjectType='Menu' and ObjectName = 'ReportItems'
        </cfquery>
        <cfset navMenu = getChildren(request.applicationId,getNavMenuId.ObJectId)>
        <cfoutput>#serializeJSON(navMenu, "struct")#</cfoutput>
    </cffunction>
</cfcomponent>
