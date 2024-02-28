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
        
        {
            type:       'attack',
            name:       'Attack',
            attack:     4,
            defence:    0,
            text:       'ダメージを与える',
            image:      'path_to_image',
        },
        
        {
            type:       'defence',
            name:       'Defence',
            attack:     0,
            defence:    6,
            text:       'ガードを得る',
            image:      'path_to_image',
        },

        {
            type:       'counter',
            name:       'Counter',
            attack:     7,
            defence:    0,
            probability:0.3,
            text:       'ダメージを与える',
            image:      'path_to_image',
        },

        {
            type:       'charge',
            name:       'Charge',
            attack:     0,
            defence:    0,
            damageBuff:  2,
            damageDebuff:  1.5,
            text:       'ダメージを与える',
            image:      'path_to_image',
        },

        {
            type:       'dodge',
            name:       'Dodge',
            attack:     0,
            defence:    0,
            probability:0.6,
            text:       'ダメージを与える',
            image:      'path_to_image',
        },    
        
        {
            type:       'bash',
            name:       'Shield Bash',
            attack:     0,
            defence:    0,
            probability:0.6,    
            text:       'ダメージを与える',
            image:      'path_to_image',
        },        

        {
            type:       'portal',
            name:       'Portal',
            cost:       2,
            text:       '戦闘を離脱\n非戦当時は地上へ戻る',
            image:      'path_to_image',
        },
    ],

    enemy:[
        {
            name:       'Hvbt',
            hp:         16,
            attack:     [3, 3, 4, 4, 6],
            defence:    2,
        },
        
        {
            name:       'Debv',
            hp:         12,
            attack:     [2, 2, 2, 3, 3],
            defence:    2,
        },
    ],

    deck:[],
    // Player status管理
    playerStats:
    {
        hp:                 20,
        maxHp:              20,
        // oxigen:             100,
        food:               10,
        cardMax:            15,

        damageBuff:         1,
        damageBuffCount:    0,
        damageDebuff:       1,
        damageDebuffCount:  0,
    },

    gameStats:
    {
        dungeon: 1,
        untilDawn: 10,
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