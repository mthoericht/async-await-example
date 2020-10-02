/**
 * Application-Class
 */
export class Main {

    constructor() 
    {
        this.init();
    };

    /**
     * initialize the stage and append the Gaame Container     
     */
    init()
    {
        console.log("main.ts init()");

        this.asyncCall();

        this.simultaneousStart();
        this.startPromiseAllInSameTime();
    }

    async asyncCall() 
    {
        console.log('start async call');
        const result1 = await this.resolveAfterSeconds(1, "after 1 second");
        console.log(result1);

        const result2 = await this.resolveAfterSeconds(1, "after 1 further second");
        console.log(result2);

        const rejectTest = await this.resolveAfterSeconds(-1, "should trigger a reject");
        console.log(rejectTest);

    }

    async simultaneousStart()
    {
        const resultSlow = this.resolveAfterSeconds(4, "simultaneous after 4 seconds");
        const resultFast = this.resolveAfterSeconds(3, "simultaneous after 3 seconds");

        console.log(await resultSlow);
        console.log(await resultFast);
    }

    startPromiseAllInSameTime():void
    {
        Promise.all([this.resolveAfterSeconds(5, "promise all after 5 seconds resolved"), this.resolveAfterSeconds(1, "promise all after 1 seconds resolved")]).then((messages) => {
            console.log("startInSameTime messages:", messages);
          });
    }

    resolveAfterSeconds(seconds:number, description?:string):Promise<any>
    {
        return new Promise ((resolve, reject) => 
        {
            try
            {
                if(seconds < 0)
                {
                    throw new Error(description);
                }
    
                setTimeout(() => 
                {
                    resolve({resolved:true, description: description});
                }, seconds * 1000);
            } catch(e)
            {
                return new Promise((resolve, reject) => { reject({resolved:false, description:description}) });
            }
        });
    }
}

window.onload = () => 
{
    const main: Main = new Main();
};
