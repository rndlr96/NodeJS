module.exports = function(app, fs)
{
     app.get('/',function(req,res){
         res.render('index', {
             title: "MY HOMEPAGE",
             length: 5
         })
     });

     app.get('/list', function (req, res) {
        fs.readFile( __dirname + "/../data/" + "data.json", 'utf8', function (err, data) {
            console.log( data );
            res.end( data );
        });
     })

     app.get('/list/:username', function(req, res) {
         fs.readFile( __dirname + "/../data/" + "data.json", 'utf8', function(err, data){
             var users = JSON.parse(data);
             res.json(users[req.params.username]);
         });
     });

     app.post('/addUser/:username', function(req, res){

         var result = {  };
         var username = req.params.username;

         if(!req.body["password"] || !req.body["name"]){
             result["success"] = 0;
             result["error"] = "invalid request";
             res.json(result);
             return;
         }

         fs.readFile( __dirname + "/../data/data.json", 'utf8',  function(err, data){
             var users = JSON.parse(data);
             if(users[username]){

                 result["success"] = 0;
                 result["error"] = "duplicate";
                 res.json(result);
                 return;
             }

             users[username] = req.body;

             fs.writeFile(__dirname + "/../data/data.json",
                          JSON.stringify(users, null, '\t'), "utf8", function(err, data){
                 result = {"success": 1};
                 res.json(result);
             })
         })
     });

     app.put('/modUser/:username', function(req, res){
         var result = { };
         var username = req.params.username;

         if(!req.body["password"] || !req.body["name"]){
             result["success"] = 0;
             result["error"] = "invalid request";
             res.json(result);
             return;
         }

         fs.readFile( __dirname + "/../data/" + "data.json", 'utf8', function(err, data){
             var users = JSON.parse(data);

             if(users[username]){
                 users[username] = req.body;
                 fs.writeFile(__dirname + "/../data/" + "data.json", JSON.stringify(users, null, '\t'), 'utf8', function(err, data){
                     result = {"sucess": 1};
                     res.json(result);
                 })
             }
         });
     });
}
