export const dataProvider = {
    app:undefined,
    wWidth: 0,
    wHeight: 0,
    data: {
        debug: true,
    },

    style: {},
    color: {
        dark1: 0x545550,
        dark2: 0x1A1F22,
        light1: 0xDCD3CC,
    },

    cardGeometries: {
        shadowWidth: 400,
        baseWidth: 450,
        ratio: 1.5, 
    },

    cards:[
        // Attack cards
        {   name:   'Attack',
            cost:   1,
            attack: 3,
            text:   'ダメージを与える',
            image:  'path_to_image',
        },
        
        {   name:   'Hard attack',
            cost:   2,
            attack: 5,
            text:   'ダメージを与える',
            image:  'path_to_image',
        },

        {   name:       'Defence',
            cost:       1,
            defence:    4,
            text:       'ガードを得る',
            image:      'path_to_image',
        },

        {   name:       'Portal',
            cost:       2,
            text:       '戦闘を離脱\n非戦当時は地上へ戻る',
            image:      'path_to_image',
        },
    ],

    deck:[]
};

/*

dataProvider.data.VARIABLE

*/