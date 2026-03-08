"use strict";

const api = require( "./api" );

module.exports.register = async server => {
    // register api routes
    await api.register( server );
        
    server.get('/', (req, res) => res.json({ message: 'Tegla PDF-KIT API is active.' }));

    server.post('/logout', async function(req, res) {
        // res.json({ auth: false, token: null });
        try {
            await req.session.destroy();
        } catch (err) {
            console.error('Error logging out:', err);
            return next(new Error('Error logging out'));
        }
        
        res.status(200).send();        
    })
};