using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;

using System.Data;
using System.Data.SqlClient;
using System.Configuration;

using System.Globalization;
using Newtonsoft.Json;



namespace SIYARA
{ 
    /// <summary>
    /// Summary description for WebService
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class WebService : System.Web.Services.WebService
    {
       
        SqlConnection con;
        SqlCommand cmd;
        SqlDataReader rdr;


        [WebMethod]
        public string HelloWorld()
        {
            return "Hello World";
        }
        [WebMethod]
         protected void Page_Load(object sender, EventArgs e)
        {
            HttpContext.Current.Response.AppendHeader("Cache-Control", "no-cache, no-store, must-revalidate");
            HttpContext.Current.Response.AppendHeader("Pragma", "no-cache");
            HttpContext.Current.Response.AppendHeader("Expires", "0");
        }



        //contact page data will be here 
        [WebMethod(EnableSession = true)]
        public string addMessages(string uname, string uphno, string sub, string message)
        {
            var oSerializer = new System.Web.Script.Serialization.JavaScriptSerializer();
            string constr = ConfigurationManager.ConnectionStrings["constr"].ToString();

            using (con = new SqlConnection(constr))
            {
                try
                {
                    con.Open();
                    cmd = new SqlCommand("", con);

                    cmd.CommandText = "INSERT INTO Contact(Date, Time, Name, Phone, EmailId, Message, Seen) OUTPUT inserted.RowId VALUES(@datee, @time, @fullname, @phno, @sub, @msg, 0)";
                    cmd.Parameters.AddWithValue("@datee", DateTime.Now);
                    cmd.Parameters.AddWithValue("@time", DateTime.Now.ToString("HH:mm:ss"));
                    cmd.Parameters.AddWithValue("@fullname", uname); // FIXED HERE
                    cmd.Parameters.AddWithValue("@phno", uphno);
                    cmd.Parameters.AddWithValue("@sub", sub);
                    cmd.Parameters.AddWithValue("@msg", message);

                    int res = (int)cmd.ExecuteScalar();
                    cmd.Parameters.Clear();

                    string mid = res <= 9 ? "Msg0" + res.ToString() : "Msg" + res.ToString();

                    cmd.CommandText = "UPDATE Contact SET UserID = @mid WHERE RowId = @rid";
                    cmd.Parameters.AddWithValue("@mid", mid);
                    cmd.Parameters.AddWithValue("@rid", res);
                    cmd.ExecuteNonQuery();
                    cmd.Parameters.Clear();

                    con.Close();
                    return oSerializer.Serialize("1");
                }
                catch (Exception ex)
                {
                    return oSerializer.Serialize("-1" + ex.Message);
                }
            }
        }

        [WebMethod(EnableSession = true)]
        public string addMessage(string uname, string uphno, string sub, string message)
        {
            var oSerializer = new System.Web.Script.Serialization.JavaScriptSerializer();
            string constr = ConfigurationManager.ConnectionStrings["constr"].ToString();

            using (con = new SqlConnection(constr))
            {
                try
                {
                    con.Open();

                    // Generate UserID like: webuser_9845
                    string userId = "webuser_" + new Random().Next(1000, 9999);
                    DateTime now = DateTime.Now;

                    cmd = new SqlCommand(@"INSERT INTO [Contact] ([UserID], [Date], [Time], [Name], [Phone], [EmailId], [Message], [Seen]) OUTPUT INSERTED.RowId VALUES (@UserID, @Date, @Time, @Name, @Phone, @EmailId, @Message, 0)", con);

                    cmd.Parameters.AddWithValue("@UserID", userId);
                    cmd.Parameters.AddWithValue("@Date", now.Date);
                    cmd.Parameters.AddWithValue("@Time", now.ToString("HH:mm:ss"));
                    cmd.Parameters.AddWithValue("@Name", uname);
                    cmd.Parameters.AddWithValue("@Phone", uphno);
                    cmd.Parameters.AddWithValue("@EmailId", sub);  // assuming 'sub' is email
                    cmd.Parameters.AddWithValue("@Message", message);

                    int insertedId = (int)cmd.ExecuteScalar();
                    cmd.Parameters.Clear();

                    con.Close();

                    return oSerializer.Serialize("1"); // success
                }
                catch (Exception ex)
                {
                    return oSerializer.Serialize("-1" + ex.Message); // error
                }
            }
        }




    }


}
 
     

