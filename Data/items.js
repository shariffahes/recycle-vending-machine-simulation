export const materials = {
    "water bottle": "Plastic",
    "water jud": "Plastic",
    bucket: "Plastic",
    pail: "Plastic",
    beaker: "Glass",
    envelope: "Carton",
    paper: "Carton",
    binder: "Carton",
    carton: "Carton",
    syringe: "Plastic",
    "beer bottle": "Glass",
    "pill bottle": "Plastic",
    "fountain pen": "Plastic",
    ballpoint: "Plastic",
    "ballpoint pen": "Plastic",
    ballpen: "Plastic",
    "beer glass": "Glass",
    sunglass: "Glass",
    sunglasses: "Glass",
    "dark glasses": "Glass",
    "paper towel": "Paper",
    "toilet tissue": "Paper",
    "toilet paper": "Paper",
    "bathroom tissue": "Paper",
    "pop bottle": "Plastic",
    "soda bottle": "Plastic",
    pillow: "Paper",
    carton: "Carton",
    necklace: "Metal",
    "comic book": "Carton",
    notebook: "Electronics",
    computer: "Electronics",
    laptop: "Electronics",
    keyboard: "Electronics",
    "computer keyboard": "Electronics",
    keypad: "Electronics",
    spacebar: "Electronics",
    "crossword puzzle": "Carton",
    "Band Aid": "Carton",
    crossword: "Carton",
    "plastic bag": "Plastic",
    "cellular telephone": "Electronics",
    "cellular phone": "Electronics",
    cellphone: "Electronics",
    cell: "Electronics",
    "mobile phone": "Electronics",
};

export const materialInfo = {
    Plastic: {
        materialType: "Plastic",
        bin: "Red",
        generalInfo:
            "More than 35 million tons of plastics were generated in the United States in 2018 and only 8.7 percent was recycled. Some types of plastics are not accepted in community recycling programs. Check with your local recycling program to find out which types of plastic they accept. When possible, purchase products made from recycled plastic materials. ",
        tips: [
            "Plastic bottles can still have their labels and caps on",
            "Clean plastic items from any residues before disposing",
            "Compostale platic cannot be recycled",
            "Biobased plastic are inteded to be recycled",
            "Check the symobols on the bottle to identify the type of the plastic",
        ],
        pointsValue: 20,
    },
    Glass: {
        materialType: "Glass",
        bin: "Green",
        generalInfo:
            "Glass, especially glass food and beverage containers, can be recycled over and over again. In the United States in 2018, 12.3 million tons of glass were generated, 31.3 percent of which was recycled. Making new glass from recycled glass is typically cheaper than using raw materials.",
        tips: [
            "Colored glass can be recycled",
            "Metal caps should be removed before glass disposal",
            "Broken glass are to be put in a safe bag for workers not to hurt themselves",
        ],
        pointsValue: 25, //CHANGE
    },
    Aluminum: {
        materialType: "Aluminum",
        bin: "Yellow",
        generalInfo:
            "In 2018, 3.9 million tons of aluminum municipal solid waste was generated. The total recycling rate for aluminum items was 34.9 percent. Both aluminum cans and foil can be recycled. ",
        tips: [
            "Usually aluminum cans should not be crushed before they are recycled since they are hard to be detected",
            "Aluminum foil can be recycled. Make sure to remove any food residue before recycling.",
        ],
        pointsValue: 20, //CHANGE
    },
    Paper: {
        materialType: "Paper",
        bin: "Blue",
        generalInfo:
            "Paper makes up 23 percent of municipal solid waste (trash) generated each year, more than any other material. Americans recycled about 68 percent of the paper they used in 2018. This recovered paper is used to make new paper products, which saves trees and other natural resources. Most community or office recycling programs accept paper and paper products. Check what your community or office program accepts before you put it in the bin. Look for products that are made from recycled paper when you shop. Better yet, consider if you really need to print in the first place.",
        tips: [
            "Newspapers can be recycled",
            "Magazines can be recycled",
            "Carton boxes can be recycled but make sure they are clean",
            "Envelopes with plastic windows can be recycled",
            "Rather than recycling good boxes, try to donate them to schools, charities, and people who use a lot of boxes",
        ],
        pointsValue: 5, //CHANGE
    },
    Carton: {
        materialType: "Carton",
        bin: "Blue",
        generalInfo:
            "Paper makes up 23 percent of municipal solid waste (trash) generated each year, more than any other material. Americans recycled about 68 percent of the paper they used in 2018. This recovered paper is used to make new paper products, which saves trees and other natural resources. Most community or office recycling programs accept paper and paper products. Check what your community or office program accepts before you put it in the bin. Look for products that are made from recycled paper when you shop. Better yet, consider if you really need to print in the first place.",
        tips: [
            "Newspapers can be recycled",
            "Magazines can be recycled",
            "Carton boxes can be recycled but make sure they are clean",
            "Envelopes with plastic windows can be recycled",
            "Rather than recycling good boxes, try to donate them to schools, charities, and people who use a lot of boxes",
        ],
        pointsValue: 5, //CHANGE
    },
    Electronics: {
        materialType: "Electronics",
        bin: "Black", //CHANGEEE
        generalInfo:
            "Electronics & Batteries should be recycled in a special way. Lead-acid batteries are one of the most recycled products. In 2018, 2.9 million were recycled, representing 99 percent of generation. Recycling rates of other battery types are not as well tracked. Although batteries are recyclable, most batteries, including lithium-ion, lithium metal, lead-acid, nickel cadmium, and other rechargeable batteries, should NOT go in household garbage or recycling bins. These batteries require special handling and should be taken to specialty drop-off locations",
        tips: [
            "Dry-Cell Batteries are used in a variety of electronics and include alkaline and carbon zinc",
            "Lithium-ion Batteries are used in many rechargeable products such as electronics, toys, wireless headphones...",
            "Lithium Metal Batteries are similar to lithium-ion batteries but are not rechargeable.",
            "Lead-Acid Batteries can be found in automobiles, boats, snowmobiles, motorcycles, golf carts, wheelchairs, and other large transportation vehicles.",
            "Do not dispose batteries in household waste containers.",
        ],
        pointsValue: 15, //CHANGE
    },
    Metal: {
        materialType: "Metal",
        bin: "Yellow", //CHANGEEE
        generalInfo:
            "In 2018, 19.2 million tons of ferrous metals (iron and steel) were generated. EPA estimates that the recycling rate of ferrous metals from durable goods was 27.8 percent. The same year, 2.5 million tons of nonferrous metals (not containing iron) were generated. The recycling rate for nonferrous metals was approximately 68 percent.",
        tips: ["There are different programs and options for metal recycling"],
        pointsValue: 30, //CHANGE
    },
};
