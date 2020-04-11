const handleSignIn = (db,bcrypt)=>(req,res)=>{
    const {email,password} = req.body;

    if(!email||!password){
        return res.status(400).json("unnable to signin");
    }

    db.select('*')
        .from('login')
        .where('email','=',email)
        .then(data=>{
            const isValid = bcrypt.compareSync(password,data[0].hash);
            if(isValid){
                db.select('*')
                    .from('users')
                    .where('email','=',data[0].email)
                    .then(resp=>{
                        res.json(resp[0])
                    })
            }else{
                res.status(400).json('wrong credential1')
            }
        })
        .catch(err=>res.status(400).json("wrong credential2"))

}

module.exports ={
    handleSignIn:handleSignIn
}