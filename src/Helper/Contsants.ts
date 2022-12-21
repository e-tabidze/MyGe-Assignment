export const bargainType = {
    sale: {
        name: "იყიდება",
        id: 0
    }, 
    rent: {
        name: "ქირავდება",
        id: 1,
        subCats: [
            {
                name: "ქირავდება დღიურად",
                id: 1
            },
            {
                name: "ქირავდება მძღოლით",
                id: 2
            },
            {
                name: "საბოლოო შესყიდვით",
                id: 3
            },
            {
                name: "ავტომობილი დაზღვეულია",
                id: 4
            },
        ]
    }
};