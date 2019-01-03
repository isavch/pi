const { Gpio } = require('onoff');
const pir = new Gpio(27, 'in', 'both');

console.log('....Starting light sensor')

pir.watch((err, value) => {
    if (err) {
        return exit(err);
    }

    if (value) {
        process.send({
            type: 'light',
            payload: {
                value,
                date: Date.now()
            }
        });
    }
});

console.log('....Watching')

function exit(err) {
    consoe.log('....Exiting', err.message)
    pir.unexport();
    process.exit();
}
