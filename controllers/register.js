const handleRegister = (db,bcrypt)=>(req,res)=>{
    const {name,email,password} = req.body
    const hash = bcrypt.hashSync(password)

    if(!name||!email||!password){
        return res.status(400).json("unable to register")
    }

    db.transaction(trx=>{
        trx.insert({
            email: email,
            hash : hash
        })
        .into('login')
        .returning('email')
        .then(loginEmail=>{
            return trx('users')
            .insert({
                name:name,
                email:loginEmail,
                joined: new Date()
            })
            .returning('*')
            .then(resp=>res.json(resp[0]))
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err=>res.status(400).json("unnable to register"))
   
}

module.exports={
    handleRegister:handleRegister
}