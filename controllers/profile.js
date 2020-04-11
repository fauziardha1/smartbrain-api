const handleProfile = (db)=>(req,res)=>{
    const id = req.params.id;
    db('users')
    .where('id','=',id)
    .returning('*')
    .then(resp=>res.json(resp))
    .catch(err=>res.status(400).json("no users with that id"))
}

module.exports = {
    handleProfile:handleProfile
}