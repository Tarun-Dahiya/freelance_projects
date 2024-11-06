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

<!---
  getUser
  getWebApps
  uploadAvatar
--->

  <cffunction name="getUser" access="remote" output="yes">
    <cfset headers = getHTTPRequestData().headers>
    <cfif not checkCSRF(headers.authorization)>
      <cfoutput>#serializeJSON({ invalidToken: true }, "struct")#</cfoutput>
      <cfabort>
    </cfif>
    <cftransaction isolation="read_uncommitted">
      <cfquery name="getUser" datasource="webUsers">
          SELECT
            users.User_ID AS USERID,
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
    <cfset headers = getHTTPRequestData().headers>
    <cfif not checkCSRF(headers.authorization)>
      <cfoutput>#serializeJSON({ invalidToken: true }, "struct")#</cfoutput>
      <cfabort>
    </cfif>
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
          AND webApps.isActive = 1
        ORDER BY UserApps.apporder
    </cfquery>
    <cfset result = {success: true, message: 'fetched user apps', payload: #getWebApps# }>
      <cfcatch>
        <cfset result = {success: false, message: '#cfcatch.message# .. #cfcatch.errorcode#', payload:#getWebApps#}>
      </cfcatch>
    </cftry>
    <cfoutput>#serializeJSON(result, "struct")#</cfoutput>
  </cffunction>


  <cffunction name="uploadAvatar" access="remote" output="yes">
    <cfset headers = getHTTPRequestData().headers>
    <cfif not checkCSRF(headers.authorization)>
      <cfoutput>#serializeJSON({ invalidToken: true }, "struct")#</cfoutput>
      <cfabort>
    </cfif>
    <cfset userId = FORM.userId>
    <cfset image = FORM.file>
    <cfif isDefined("FORM.file")>
      <cftry>
        <cfset result = {success: true, message: '#image#'}>
        <cfset fileRootDomain = '#session.rootHttpsDomain#' >
        <cfset fileRootSitePath = '#session.rootSitePath#' >
        <cftransaction isolation='read_uncommitted' >
          <cfquery name='getUser' datasource='WebUsers' >
              SELECT * FROM Users WHERE ( User_ID = '#userId#' )
          </cfquery>
        </cftransaction>
        <cfset filePath = '#fileRootSitePath#\all_images\people\#getUser.username#.jpg' >
        <cfset fileURL = '#fileRootDomain#/all_images/people/#getUser.username#.jpg' >
        <cftransaction>
          <cfset image = imageReadBase64(form.image)>
          <cffile 
    	      action="upload" 
            filefield="file" 
            destination="D:\inetpub\wwwroot\all_images\people\"
            nameconflict="overwrite"
          >
        </cftransaction>
        <cftransaction>        
          <cfquery name="updateImg" datasource='WebUsers' >
            UPDATE Users SET Avatar = '#fileURL#' WHERE ( User_ID = #userId# )
          </cfquery>
        </cftransaction>
        <cfset result = {success: true, message: 'Avatar uploaded successfully'}>
      <cfcatch>
          <cfmail from="webservices@#session.rootEmailDomain#" to="webservicesteam@#session.rootEmailDomain#" subject="error: avatar upload" type="html">
            <cfdump var="#cfcatch#">
          </cfmail>
        <cfset result = {success: false, message: '#cfcatch.message# .. #cfcatch.errorcode#'}>
      </cfcatch>
      </cftry>
    <cfelse>
      <cfset result = {success: false, message: 'No File Selected'}>
    </cfif>
    <cfoutput>#serializeJSON(result, "struct")#</cfoutput>
  </cffunction>

</cfcomponent>
