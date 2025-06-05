import { createCharacterConfig, createCharacterConfigWithVariants, createCharacterVariant } from './characters';

export const route2 = [
    {
      id: "r2-group1",
      trigger: { text: "六人のおじぞうさん", color: "#7B9FA3" },
      text: "ふたたび、六人のおじぞうさんが立っていました。",
      characters: createCharacterConfig(null, null, false, false)
    },
    {
      id: "r2-group2",
      trigger: { text: "一人が", color: "#B07BAC" },
      text: "おじぞうさんの一人が ーー",
      characters: createCharacterConfig(null, null, false, false)
    }
  ];
  

  export const route2_1 = [
    {
      id: "r2s1-group1",
      trigger: { text: "黒い電話", color: "#B8B8FF" },
      text: "おじぞうさんの一人が、黒い電話を持っていました。\n「これはおじいさんとおばあさんたちにしあわせをつれてくる電話です。」と声が聞こえました。",
      characters: createCharacterConfig(null, 'jizo', false, true, 'default', 'holding_phone')
    },
    {
      id: "r2s1-group2",
      trigger: { text: "電話はなりませんでした", color: "#E2CFCF" },
      text: "おじいさんとおばあさんはその電話を家に持ち帰りました。でも、つぎの夜になっても、電話はなりませんでした。",
      characters: createCharacterConfigWithVariants(
        createCharacterVariant('grandfather', 'default'),
        createCharacterVariant('grandmother', 'default'),
        true, true
      )
    },
    {
      id: "r2s1-group3",
      trigger: { text: "ろうそく", color: "#FCD5CE" },
      text: "おばあさんは、小さなろうそくをつけて言いました。\n「今日はならなかったけど、また明日もあるよ。今夜はふたりでお正月をしましょう。」",
      characters: createCharacterConfigWithVariants(
        createCharacterVariant('grandfather', 'default'),
        createCharacterVariant('grandmother', 'default'),
        true, true
      )
    },
    {
      id: "r2s1-group4",
      trigger: { text: "リンリンリン", color: "#FFD6A5" },
      text: "そのとき――リンリンリン！電話が大きくなりました！\n電話のむこうには、町ではたらく子どもの声がありました。\n「おくれてごめんなさい。今夜、かぞくで帰ります。あけましておめでとう！！」",
      characters: createCharacterConfigWithVariants(
        createCharacterVariant('grandfather', 'happy'),
        createCharacterVariant('grandmother', 'happy'),
        true, true
      )
    },
    {
      id: "r2s1-group5",
      trigger: { text: "ほんとうのしあわせ", color: "#A0CED9" },
      text: "おじいさんとおばあさんは、にっこりわらいました。そして、あたたかいごちそうを作り、家族といっしょにしあわせなお正月をすごしました。",
      characters: createCharacterConfigWithVariants(
        createCharacterVariant('grandfather', 'happy'),
        createCharacterVariant('grandmother', 'happy'),
        true, true
      )
    }
  ];


  export const route2_2 = [
    {
      id: "r2s2-group1",
      trigger: { text: "魔法のぼう", color: "#D291BC" },
      text: "おじぞうさんの一人が、小さな魔法のぼうをおいていきました。\n「これは、まほう少女にもらったものです。ひとつだけねがいがかないます。」",
      characters: createCharacterConfig(null, 'jizo', false, true, 'default', 'holding_magic')
    },
    {
      id: "r2s2-group2",
      trigger: { text: "なにをねがいましょう", color: "#EAC4D5" },
      text: "「なにをねがいましょう？」とおじいさんとおばあさんはまよいました。\nたくさんのお金？大きい家？たくさんのおもち？",
      characters: createCharacterConfigWithVariants(
        createCharacterVariant('grandfather', 'default'),
        createCharacterVariant('grandmother', 'default'),
        true, true
      )
    },
    {
      id: "r2s2-group3",
      trigger: { text: "ふしぎな夢", color: "#B5EAD7" },
      text: "でも、その夜、ふたりともふしぎな夢を見ました。\n「大きなねがいではなく、まわりの人のために使おう。」",
      characters: createCharacterConfigWithVariants(
        createCharacterVariant('grandfather', 'default'),
        createCharacterVariant('grandmother', 'default'),
        true, true
      )
    },
    {
      id: "r2s2-group4",
      trigger: { text: "村と町をつなぐ", color: "#C7CEEA" },
      text: "ふたりはそのぼうで、村と町をつなぐ新しい道を作りました。\nつぎの朝、人びとはそれを見て「お正月の奇跡だ！」と言いました。",
      characters: createCharacterConfigWithVariants(
        createCharacterVariant('grandfather', 'happy'),
        createCharacterVariant('grandmother', 'happy'),
        true, true
      )
    },
    {
      id: "r2s2-group5",
      trigger: { text: "さくらの木", color: "#F7C5CC" },
      text: "まつりのよる、ふたりはその道をとおって町に行き、たのしい夜をすごしました。\n帰るとき、おじいさんはぼうをおじぞうさんのそばにうめました。",
      characters: createCharacterConfigWithVariants(
        createCharacterVariant('grandfather', 'happy'),
        createCharacterVariant('grandmother', 'default'),
        true, true
      )
    }
  ];
  
  export const route2sub1CastInfo = [
    { role: "キャラクター", name: "おじいさん" },
    { role: "キャラクター", name: "おばあさん" },
    { role: "キャラクター", name: "おじぞうさん" },
    { role: "演出・グラフィック・プログラミング", name: "Yihong Yu" },
    { role: "スペシャルサンクス", name: "『げんき』教科書"},
    { role: "", name: "「大団円」" }
  ];

  export const route2sub2CastInfo = [
    { role: "キャラクター", name: "おじいさん" },
    { role: "キャラクター", name: "おばあさん" },
    { role: "キャラクター", name: "おじぞうさん" },
    { role: "演出・グラフィック・プログラミング", name: "Yihong Yu" },
    { role: "スペシャルサンクス", name: "『げんき』教科書"},
    { role: "", name: "「お正月の奇跡」" }
  ];