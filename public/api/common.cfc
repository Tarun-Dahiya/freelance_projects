<cfcomponent>
<!--- include webservices wide security functions --->
  <cfinclude template='/webservices/auth/apiFiles/Security/objectSecurity.cfc'>

<!--- include app level utility functions --->
  <cfinclude template='./system/functions.cfc'>

<!---
  getUser
--->

  <cffunction name="getUser" access="remote" output="yes">
    <cftransaction isolation="read_uncommitted">
      <cfquery name="getUser" datasource="webUsers">
          SELECT
            users.Hostplant AS HOSTPLANT,
            users.username AS USERNAME,
            users.USERLOCALE AS USERLOCALE,
            users.CUSTOMERNAME AS CUSTOMERNAME,
            users.USERFULLNAME AS USERFULLNAME,
            users.USERTITLE AS USERTITLE,
            users.USEREMAIL AS USEREMAIL,
            users.USERPHONE_1 AS USERPHONE_1,
            users.USERPHONE_MOBILE AS USERPHONE_MOBILE,
            users.INTERNALROLES AS INTERNALROLES,
            users.department AS DEPARTMENT,
            companyList.company_ID AS COMPANY_ID,
            users.hook_url AS HOOK_URL,
            users.DATECREATED AS DATECREATED,
            users.avatar AS AVATAR
          FROM Users
            INNER JOIN corporate.dbo.companyList companyList
            ON users.hostplant = companyList.company
          WHERE ( UserName = '#Session.LoggedInUser#' )
      </cfquery>
    </cftransaction>
    <cfoutput>#serializeJSON(getUser, "struct")#</cfoutput>
  </cffunction>

  <cffunction name="getWebApps" access="remote" output="yes">
    <cftry>
    <cfquery name="getWebApps" datasource="WebUsers" >
        SELECT
          UserApps.appid,
          UserApps.apporder,
          WebApps.ApplicationName,
          WebApps.ApplicationImage,
          WebApps.AppImage,
          WebApps.ApplicationURL
        FROM
          UserApps
        INNER JOIN
          WebApps ON UserApps.appid = WebApps.WebApp_ID
        WHERE
          UserApps.user_id = '#Session.userID#'
        ORDER BY UserApps.apporder
    </cfquery>
    <cfset result = {success: true, message: 'fetched user apps', payload: #getWebApps# }>
      <cfcatch>
        <cfset result = {success: false, message: '#cfcatch.message# .. #cfcatch.errorcode#', payload:#getWebApps#}>
      </cfcatch>
    </cftry>
    <cfoutput>#serializeJSON(result, "struct")#</cfoutput>
  </cffunction>

</cfcomponent>
