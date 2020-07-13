const express = require('express');
const router = express.Router();

//anime model
const Anime = require('../../models/Anime');

//  GET api/Anime/
//  Gets all Anime
router.get('/', async (req,res)=>{

    const results = await Anime.find({});
    try{
        res.send(results);
    }catch(e){
        res.status(500).json(e);

    }
    

});

router.post('/', async (req,res)=>{
    const newAnime = new Anime({
        animeNameENG: req.body.animeNameENG,
        animeNameJP: req.body.animeNameJP,
        numEpisodes: req.body.numEpisodes,
        mangaChapLeft: req.body.mangaChapLeft,
        adaptionType: req.adaptionType,
        imgUrl: req.body.imgUrl
    });

    try{
        await newAnime.save();    
        res.send(`successfully added a new anime: ${newAnime.animeNameENG}!`);
    
    }catch(e){
        res.status(500).send(e);
    }
    

});

//TODO: Need to fix
router.delete('/:id',async (req,res)=>{
    try{
        await Anime.findByIdAndDelete(req.params.id);
        await Anime.save();
        res.send(`Anime with id: ${req.params.id} was deleted!`)

    }catch(e){
        res.status(500).send(e);
    }
});

//TODO: Need to fix
router.put('/:engname', async (req,res)=>{
    let query = { animeNameENG: req.params.engname};
    let target = await Anime.findOneAndUpdate(query);
    let updatedAnime = new Anime({
        animeNameENG: req.body.animeNameENG,
        animeNameJP: req.body.animeNameJP,
        numEpisodes: req.body.numEpisodes,
        mangaChapLeft: req.body.mangaChapLeft,
        adaptionType: req.body.adaptionType,
        imgUrl: req.body.imgUrl
    });
    target.update(updatedAnime,{upsert:true, setDefaultsOnInsert:true}, (err)=>{
        if(err){
            res.send(err);
        }
        res.send(`${req.params.engname} was updated!`)
    })
    

})


module.exports = router;