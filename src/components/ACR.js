class ACR 
{
    constructor()
    {
        const statb = [13];
        
        this.stb = statb;

        stbGetb = (jk = 0) =>
        {
            return this.stb[jk];
        }
        stbSet = (selection, Setto) =>
        {
            this.stb[s] = t;
        }
    }

    initStats = () =>
    {
        this.stb = [
            hp = 6,  // 0
            atk = 2,// 1
            acc = 0.2,// 2
            def = 2,// 3
            psi = 11,// 4
            sta = 2,// 5
            eth = 5,// 6
            pos = 10,// 7
            neg = 0,// 8
            maxAtbCharge = 10,// 9
            currentATBCharge = 1,// 10
            phase = '',// 11
            charN = ''// 12
        ]
    }
};
