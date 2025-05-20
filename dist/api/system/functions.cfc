<!---<cfif Not IsDefined("session.sid") or Not IsDefined("session.loggedinuser")>--->
    <!---<cfset session.forwardpath = "/WebServices/eCommerce_react/index.html">--->
    <!---<cfheader name="Set-Cookie"--->
            <!---value="FORWARDPATH=#session.ForwardPath#;Path=/;Domain=#application.cookieDom--->
                    <!---ain#;secure;httponly;SameSite=None">--->
    <!---<cfset response.result = false>--->
    <!---<cfset response.instruction = "redirect">--->
    <!---<cfset response.data = application.loginredirecturl>--->
    <!---<cfoutput>#serializeJSON(response)#</cfoutput><cfabort>--->
<!---</cfif>--->
<!--- check for post data and parse into arguments --->
<cfscript>
    params = structNew();
    try {
        requestBody = toString( getHttpRequestData().content );
        if ( len( requestBody ) && isJSON(requestBody)) {
            structAppend( params, deserializeJson( requestBody ) );
        }
    } catch ( any error ) {
    }
</cfscript>

<!--- we need to build the app id into the database somewhere --->
<cfset request.applicationId = 1175>

<cfscript>
    if (!IsDefined("request.Division")) { request.Division = getAppParam('Division');}
    if (!IsDefined("request.appLogo")) { request.appLogo = getAppParam('appLogo');}
    if (!IsDefined("request.appName")) { request.appName = getAppParam('appName');}
    if (!IsDefined("request.showMSF")) { request.showMSF = getAppParam('showMSF');}
    if (!IsDefined("request.showTons")) { request.showTons = getAppParam('showTons');}
    if (!isDefined("request.portalParamsDB")) { request.portalParamsDB = getAppParam('portalParamsDB');}
</cfscript>
<!---
    <cfquery name='getSiteParams' datasource='WebUsers' cachedwithin="#createTimeSpan(0,0,5,0)#">
        SELECT
        ParamName, ParamValue
        FROM
        #request.portalParamsDB#
        WHERE
        ( ParamType = 'Site' )
    </cfquery>
    <cfloop query="getSiteParams" >
        <cfset "request.#getSiteParams.ParamName#" =  "#getSiteParams.ParamValue#">
    </cfloop>
--->


<cffunction name="getAppParam" output="no" access="public">
    <cfargument name="paramName">
<!---
    <cftransaction isolation='read_uncommitted' >
    <cfquery datasource="corporate" name="appParams" cachedwithin="#createTimeSpan(0,0,5,0)#">
        select value from --- table ---  where setting ='#paramName#'
        and hostHeader = '#cgi.http_host#'
    </cfquery>
    </cftransaction>

    <cfreturn appParams.value>
--->
</cffunction>


<cffunction name="sendCSV" output="no" access="public">
    <cfargument name="subject">
    <cfargument name="emailto">
    <cfargument name="ccto">
    <cfargument name="body">
    <cfargument name="columnnames">
    <cfargument name="CSVData">



</cffunction>

<cffunction name="recordAudit" output="no" access="public">
    <!--- this function will audit actions like sending CSVs to customers --->

</cffunction>

