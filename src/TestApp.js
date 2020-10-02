var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

console.log("HALLOO ANDRE");

asyncCall();

async function asyncCall()
{
    console.log('start async call');

    const call1 =  callHeise();
    const call2 = callHeise();
    console.log(await call1, "call 1 done");
    console.log(await call2, "call 2 done");
    await callHeise();
    console.log("call done")
    await callHeise();
    console.log("call done")
    await callHeise();
    console.log("call done")
    await callHeise();
    console.log("call done")
    await callHeise();
    console.log("call done")

}


function callHeise()
{
    return new Promise ((resolve, reject) => 
    {
        try
        {
            console.log("call Heise");

            var myRequest = new XMLHttpRequest();

            myRequest.onreadystatechange = function(error){

                if(myRequest.status === 200)
                {
                    resolve({status:myRequest.status});
                }
            };

            myRequest.open("GET", "https://www.heise.de");
            myRequest.send();

        } catch(e)
        {
            reject("NUESCHT JUNGE REJECT error: " + e);
        }
    });
}