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
        shadowWidth: 450,
        baseWidth: 150,
        ratio: 1.5, 
    },

    cards:[
        // Attack cards
        
        {   type:       'attack',
            name:       'Attack',
            cost:       2,
            attack:     5,
            defence:    0,
            text:       'ダメージを与える',
            image:      'path_to_image',
        },
        
        {   type:       'defence',
            name:       'Defence',
            cost:       1,
            attack:     0,
            defence:    4,
            text:       'ガードを得る',
            image:      'path_to_image',
        },

        {   type:       'counter',
            name:       'Counter',
            cost:       1,
            attack:     7,
            defence:    0,
            probability:0.4,    
            text:       'ダメージを与える',
            image:      'path_to_image',
        },

        {   type:       'bash',
            name:       'Shield Bash',
            cost:       1,
            attack:     0,
            defence:    0,
            probability:0.6,    
            text:       'ダメージを与える',
            image:      'path_to_image',
        },        



        {   type:       'portal',
            name:       'Portal',
            cost:       2,
            text:       '戦闘を離脱\n非戦当時は地上へ戻る',
            image:      'path_to_image',
        },
    ],

    enemy:[
        {
            name:       'Root',
            hp:         16,
            attack:     [2, 2, 2, 4, 4, 6],
            defence:    2,
        }
    ],

    deck:[],
    // Player status管理
    playerStats:
    {
        hp:     10,
        maxHp:  40,
        oxigen: 100,
        food:   10,
    },
    gameStats:
    {
        dungeon: 1,
    }
};

/*

dataProvider.data.VARIABLE

*/


/*

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
        shadowWidth: 450,
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

*/