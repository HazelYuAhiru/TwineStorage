import { createCharacterConfig, createCharacterConfigWithVariants, createCharacterVariant } from './characters';

export const commonRoute = [
    {
      id: "group1",
      trigger: { text: "おじいさんとおばあさん", color: "#8B4513" },
      text: "むかし、山の中におじいさんとおばあさんが住んでいました。\nおじいさんとおばあさんは、家でかさを作っていました。",
      characters: createCharacterConfigWithVariants(
        createCharacterVariant('grandfather', 'default'),
        createCharacterVariant('grandmother', 'default'),
        true, true
      )
    },
    {
      id: "group2",
      trigger: { text: "お正月", color: "#DC143C" },
      text: "あしたはお正月です。\n新しい年がはじまります。",
      characters: createCharacterConfig(null, null, false, false)
    },
    {
      id: "group3",
      trigger: { text: "かさを売って", color: "#4682B4" },
      text: "でも、お金がなかったので、ふたりはかさを売って、\nお正月のたべものを買うつもりでした。",
      characters: createCharacterConfigWithVariants(
        createCharacterVariant('grandfather', 'default'),
        createCharacterVariant('grandmother', 'default'),
        true, true
      )
    },
    {
      id: "group4",
      trigger: { text: "買いませんでした", color: "#696969" },
      text: "おじいさんはかさを持って町に行きました。\nでも、だれもかさを買いませんでした。",
      characters: createCharacterConfig('grandfather', null, true, false, 'default')
    },
    {
      id: "group5",
      trigger: { text: "雪", color: "#E6E6FA" },
      text: "さびしい気もちで、山道をあるいて帰りました。\n雪がたくさんふっていました。",
      characters: createCharacterConfig('grandfather', null, true, false, 'default')
    },
    {
      id: "group6",
      trigger: { text: "おじぞうさんたちだ", color: "#708090" },
      text: "「おっ、おじぞうさんたちだ！」\n雪の中におじぞうさんが六つ立っていました。",
      characters: createCharacterConfig('grandfather', 'jizo', true, true, 'default', 'default')
    },
    {
      id: "group7",
      trigger: { text: "さむくない", color: "#87CEEB" },
      text: "おじいさんは言いました。\n「おじぞうさん、さむくないですか?」",
      characters: createCharacterConfig('grandfather', 'jizo', true, true, 'default', 'default')
    },
    {
      id: "group8",
      trigger: { text: "何も言いません", color: "#A9A9A9" },
      text: "でも、おじぞうさんたちは何も言いません。",
      characters: createCharacterConfig('grandfather', 'jizo', true, true, 'default', 'default')
    },
    {
      id: "group9",
      trigger: { text: "このかさを使ってください。", color: "#32CD32" },
      text: "「このかさを使ってください。」\nおじいさんは、自分のかさを一つ一つ、おじぞうさんのあたまにかぶせました。",
      characters: createCharacterConfig('grandfather', 'jizo', true, true, 'happy', 'with_kasa')
    },
    {
      id: "group10",
      trigger: { text: "話をしました", color: "#DDA0DD" },
      text: "うちに帰って、おじいさんはおばあさんにこの話をしました。",
      characters: createCharacterConfigWithVariants(
        createCharacterVariant('grandfather', 'default'),
        createCharacterVariant('grandmother', 'default'),
        true, true
      )
    },
    {
      id: "group11",
      trigger: { text: "いいことをしましたね", color: "#FFD700" },
      text: "「おじいさん、いいことをしましたね。」\nおばあさんはにっこりしました。",
      characters: createCharacterConfigWithVariants(
        createCharacterVariant('grandfather', 'default'),
        createCharacterVariant('grandmother', 'happy'),
        true, true
      )
    },
    {
      id: "group12",
      trigger: { text: "おじいさん、おじいさん...", color: "#9370DB" },
      text: "その夜おそく、外から声が聞こえました。\n「おじいさん、おじいさん...」",
      characters: createCharacterConfigWithVariants(
        createCharacterVariant('grandfather', 'default'),
        createCharacterVariant('grandmother', 'default'),
        true, true
      )
    },
    {
      id: "group13",
      trigger: { text: "そこには――", color: "#FF69B4" },
      text: "おじいさんが戸をあけると、そこには――",
      characters: createCharacterConfig('grandfather', null, true, false, 'default')
    }
  ];  