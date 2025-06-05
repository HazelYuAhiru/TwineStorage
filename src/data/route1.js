import { createCharacterConfig, createCharacterConfigWithVariants, createCharacterVariant, createPixelArtConfig, createPixelArtVariant, PIXEL_ART_SCALING } from './characters';

export const route1 = [
    {
      id: "r1-group1",
      trigger: { text: "オレンジのねこ", color: "#FF8C00" },
      text: "外にいたのは、一ぴきのオレンジのねこでした。\nねこは、おじぞうさんのかさをかぶっていました。",
      characters: createCharacterConfig(null, null, false, false)
    },
    {
      id: "r1-group2",
      trigger: { text: "アンバー", color: "#FFBF00" },
      text: "「こんばんは。わたしはアンバーです。ねこの村にすんでいます。」\nアンバーは言いました。",
      characters: createPixelArtConfig(
        createPixelArtVariant('grandfather', 'default', PIXEL_ART_SCALING.CONTAIN),
        createPixelArtVariant('amber', 'with_kasa', PIXEL_ART_SCALING.CONTAIN),
        true, true
      )
    },
    {
      id: "r1-group3",
      trigger: { text: "かりました", color: "#32CD32" },
      text: "「きのう、雪の中で道にまよいました。でも、おじさんがかさをおじぞうさんにあげたのを見ました。\nだから、ちょっとだけかりました。」",
      characters: createCharacterConfig('grandfather', 'amber', false, true, 'default', 'with_kasa')
    },
    {
      id: "r1-group4",
      trigger: { text: "プレゼント", color: "#FF1493" },
      text: "「おくれたから、プレゼントはあしたもってきますね！」\nアンバーはかさをかえして、こう言いました。",
      characters: createCharacterConfig('grandfather', 'amber', false, true, 'default', 'happy')
    },
    {
      id: "r1-group5",
      trigger: { text: "きえていきました", color: "#B0C4DE" },
      text: "そう言って、雪の中にきえていきました。",
      characters: createCharacterConfig(null, null, false, false)
    },
    {
      id: "r1-group6",
      trigger: { text: "つぎの朝、アンバーさんは ーー", color: "#FFD700" },
      text: "つぎの朝、アンバーさんは ーー",
      characters: createCharacterConfig(null, null, false, false)
    }
  ];  


  export const route1_1 = [
    {
      id: "r1s1-group1",
      trigger: { text: "カラフルなポスター", color: "#E4C66B" },
      text: "つぎの朝、アンバーさんはカラフルなポスターをたくさん持ってきました。\nポスターには、オレンジ、ピンク、あおいろのかみの女の子たちがアイスクリームを持って、わらっています。",
      characters: createCharacterConfig(null, 'amber', false, true, 'default', 'holding_poster')
    },
    {
      id: "r1s1-group2",
      trigger: { text: "大人気のアイドル", color: "#F28EB3" },
      text: "「これは、いま町で大人気のアイドルです！このポスターを見て、かさをかざってみてください。」アンバーが言いました。",
      characters: createCharacterConfig('grandfather', 'amber', false, true, 'default', 'happy')
    },
    {
      id: "r1s1-group3",
      trigger: { text: "かわいいリボン", color: "#E89F71" },
      text: "おじいさんとおばあさんは、ポスターの女の子をまねして、かわいいリボンやドライフラワーでかさをつくりました。",
      characters: createCharacterConfigWithVariants(
        createCharacterVariant('grandfather', 'happy'),
        createCharacterVariant('grandmother', 'happy'),
        true, true
      )
    },
    {
      id: "r1s1-group4",
      trigger: { text: "三ばいのお金", color: "#FFDF70" },
      text: "その夜、お正月のまつりで、かさはすぐに売り切れました！人々は三ばいのお金を出してでも買いたがりました。",
      characters: createCharacterConfig('grandfather', 'grandmother', true, false, 'happy', 'happy')
    },
    {
      id: "r1s1-group5",
      trigger: { text: "さかなも買いました", color: "#A3C4BC" },
      text: "おじいさんは、おもちとたくさんのたべものを買いました。そして、アンバーのために、さかなも買いました。",
      characters: createCharacterConfig('grandfather', null, true, false, 'happy')
    }
  ];

  
  export const route1_2 = [
    {
      id: "r1s2-group1",
      trigger: { text: "ねこの村", color: "#D0BFFF" },
      text: "つぎの朝、アンバーはなにももたずに来ました。\n「おじさん、おばさん、ねこの村にきてください！みんなに会ってほしいです。」",
      characters: createCharacterConfig('grandfather', 'amber', false, true, 'default', 'happy')
    },
    {
      id: "r1s2-group2",
      trigger: { text: "あたたかく", color: "#FFDAC1" },
      text: "アンバーに連れられて、ふたりはねこの村に行きました。ねこの村はきれいであたたかく、ねこたちはとても親切でした。",
      characters: createCharacterConfig('grandfather', 'amber', true, true, 'happy', 'default')
    },
    {
      id: "r1s2-group3",
      trigger: { text: "かさをつくっていました", color: "#AEC6CF" },
      text: "びっくりしたことに、ねこたちもかさをつくっていました！でも、手が小さいので大変そうでした。",
      characters: createCharacterConfig(null, 'amber', false, true, 'default', 'default')
    },
    {
      id: "r1s2-group4",
      trigger: { text: "いっしょに作りましょう", color: "#FFB347" },
      text: "おじいさんとおばあさんは言いました。「いっしょに作りましょう！わたしたちは作るのが上手ですよ。」",
      characters: createCharacterConfigWithVariants(
        createCharacterVariant('grandfather', 'happy'),
        createCharacterVariant('grandmother', 'default'),
        true, false
      )
    },
    {
      id: "r1s2-group5",
      trigger: { text: "たくさん売れました", color: "#77DD77" },
      text: "ねこたちは小さい体で、いいざいりょうをあつめて、おじいさんとおばあさんがそのざいりょうで、すてきなかさを作りました。\nかさはとてもにんきで、たくさん売れました。",
      characters: createCharacterConfig('grandfather', 'amber', true, true, 'happy', 'happy')
    }
  ];
  
  export const route1sub1CastInfo = [
    { role: "キャラクター", name: "おじいさん" },
    { role: "キャラクター", name: "おばあさん" },
    { role: "キャラクター", name: "アンバー" },
    { role: "演出・グラフィック・プログラミング", name: "Yihong Yu" },
    { role: "スペシャルサンクス", name: "『げんき』教科書、Marco先生とアンバーさん"},
    { role: "", name: "Route 1-1: 「時代の恵」" }
  ];

  export const route1sub2CastInfo = [
    { role: "キャラクター", name: "おじいさん" },
    { role: "キャラクター", name: "おばあさん" },
    { role: "キャラクター", name: "アンバー" },
    { role: "キャラクター", name: "ねこたち" },
    { role: "演出・グラフィック・プログラミング", name: "Yihong Yu" },
    { role: "スペシャルサンクス", name: "『げんき』教科書、Marco先生とアンバーさん"},
    { role: "", name: "Route 1-2: 「みんなの力」" }
  ];