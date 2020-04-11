const Clarifai = require('clarifai')
// API config
const app = new Clarifai.App({
    apiKey: 'd3c1857277394c2ab74e0c67812dffec'
  })

const handleApiCall = (req,res) => {
    app.models
    .predict("a403429f2ddf4b49b307e318f00e528b", req.body.input)
    .then(response=>res.json(response))
    .catch(err=>res.status(400).json("unnable get data from api"))
}

const handleImage = (db)=>(req,res)=>{
    const {id} = req.body;

    db('users')
    .where('id','=',id)
    .increment('enties',1)
    .returning('enties')
    .then(response=>res.json(response[0]))
    .catch(err=>res.status(400).json('unable to get entries'))
}

module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall

}