const nm = (n) => (n ? ` ${n}` : '')
const BASE = (n) => `🪔✨ Happy Diwali 2026${nm(n)}! May your life sparkle with happiness, prosperity, and endless blessings. Sending lots of love and warm wishes from Pawan Kumar! ❤️🎆`

// Relationship types the owner can pick. Order of crackers: Phuljhadi, Anar, Chakri, Rocket, Sky Shot.
export const RELS = {
  default: {
    label: 'Everyone 🪔', greet: (n) => (n ? `Dear ${n},` : 'Dear Friends and Family,'), share: BASE,
    special: 'Aap sabke liye mere dil se Diwali ki dher saari shubhkamnayein. Aapki zindagi mein roshni kabhi kam na ho!',
    crackers: ['Jaise phuljhadi chamakti hai, waise aapki zindagi hamesha jagmagaye ✨', 'Anar ki tarah khushiyan har taraf barsein 🌟', 'Aapke har din mein nayi umang aur josh ghoomta rahe 🌀', 'Aapke sapne rocket ki tarah aasmaan chhooein 🚀', 'Sabke liye pyaar, sukoon aur Laxmi Maa ka aashirwad 🪔']
  },
  elder: {
    suffix: ' ji',
    label: 'Parents / Elders 🙏', greet: (n) => (n ? `Pranam ${n} ji 🙏,` : 'Pranam 🙏,'),
    share: (n) => `🙏🪔 Pranam${nm(n)}! Aapko aur poore parivaar ko Diwali ki hardik shubhkamnayein. Aapke liye ek chhota sa surprise bheja hai. – Pawan Kumar ❤️`,
    special: 'Aapka aashirwad hi meri sabse badi daulat hai. Charan sparsh ke saath Diwali ki hardik shubhkamnayein. Aapka swasthya aur khushiyan hamesha bani rahein.',
    crackers: ['Aapke aashirwad ki roshni se hamara ghar hamesha jagmagata rahe 🙏', 'Aapke jeevan mein sukh aur swasthya ki barsaat hoti rahe 🌟', 'Aapki har subah nayi urja aur har shaam sukoon laaye 🌀', 'Aapke diye sanskaar mujhe har din oonchaiyon tak le jaate hain 🚀', 'Charan sparsh. Aapka pyaar aur aashirwad hi meri asli Diwali hai 🪔']
  },
  relative: {
    label: 'Family & Relatives 🏡', greet: (n) => (n ? `Dear ${n},` : 'Dear Family,'),
    share: (n) => `🪔✨ Happy Diwali${nm(n)}! Aapko aur parivaar ko Diwali ki dher saari shubhkamnayein. Ye chhota sa surprise sirf aapke liye. – Pawan Kumar ❤️`,
    special: 'Aap sab ke saath manaye tyohaar hi ghar jaisa ehsaas dete hain. Is Diwali aapke parivaar mein hansi, mithaai aur roshni kabhi kam na ho.',
    crackers: ['Aapke ghar ki roshni kabhi kam na ho ✨', 'Parivaar mein mithaas, hansi aur khushiyon ki anar-si barsaat ho 🌟', 'Saath milkar manaya har tyohaar yaadgaar bane 🌀', 'Aapke parivaar ke har sadasya ke sapne poore hon 🚀', 'Hum sab ka rishta yunhi roshan aur mazboot rahe 🪔']
  },
  friend: {
    label: 'Friends 🤝', greet: (n) => (n ? `Hey ${n}! 🤝` : 'Hey dost! 🤝'),
    share: (n) => `🎆 Oye${nm(n)}! Happy Diwali yaar! Tere liye ek mast surprise banaya hai, khol ke dekh 😄🪔 – Pawan`,
    special: 'Yaar, teri dosti meri zindagi ki sabse chamakdaar roshni hai. Is Diwali tere sapne jagmagayein aur hum yun hi hansi-mazaak karte rahein!',
    crackers: ['Yaar, teri life bhi phuljhadi jaisi, full on chamak! ✨', 'Tere upar khushiyan anar ki tarah phoot-phoot kar barsein! 🌟', 'Teri life mein hamesha josh aur masti ghoomti rahe 🌀', 'Tere saare sapne rocket ki speed se poore hon 🚀', 'Dosti ki ye roshni zindagi bhar jalti rahe, yaar 🪔']
  },
  bff: {
    label: 'Close Female Friend 🌸', greet: (n) => (n ? `Dear ${n} 🌸,` : 'Dear dost 🌸,'),
    share: (n) => `🌸🪔 Happy Diwali${nm(n)}! Ye surprise maine tumhare liye banaya hai, dekh ke batana kaisa laga ✨ – Pawan Kumar`,
    special: 'Meri khaas dost, tumhari muskaan meri duniya ko roshan karti hai. Is Diwali tumhari har dua poori ho aur zindagi mein rang hi rang bharein.',
    crackers: ['Tumhari muskaan phuljhadi jaisi hai, jahan jaaye wahan roshni ✨', 'Tumhare saare rang aur khushiyan aaj anar ki tarah khil uthein 🌟', 'Tumhari zindagi mein nayi umang aur sukoon ka chakkar chalta rahe 🌀', 'Tumhare saare sapne udaan bharkar poore hon 🚀', 'Meri khaas dost, tumhari dosti meri zindagi ka sabse khoobsurat diya hai 🪔']
  },
  sir: {
    label: 'Sir / Boss / Mentor 🎓', suffix: ' Sir', greet: (n) => (n ? `Respected ${n} Sir,` : 'Respected Sir,'),
    share: (n) => `🪔 Respected${nm(n)} Sir, wishing you and your family a very Happy and Prosperous Diwali. May this festival of lights bring you good health, success and happiness. A small digital greeting for you. Regards, Pawan Kumar 🙏`,
    special: 'Aapke guidance aur support ke liye main hamesha aabhari hoon. Is Diwali Maa Lakshmi aapko aur aapke parivaar ko achha swasthya, sukh aur nirantar safalta pradaan karein.',
    crackers: ['Aapki guidance ki roshni se mera raasta hamesha roshan rahe ✨', 'Aapke jeevan mein khushiyon aur safalta ki anar-si barsaat ho 🌟', 'Aapke parivaar mein sukh, swasthya aur sukoon ka chakkar chalta rahe 🌀', 'Aapki har yojana aur har sapna oonchaiyon tak pahunche 🚀', 'Aapke saath aur seekh ke liye hriday se dhanyavaad. Happy Diwali, Sir 🪔']
  },
  colleague: {
    label: 'Colleagues & Seniors 💼', greet: (n) => (n ? `Dear ${n},` : 'Dear Team,'),
    share: (n) => `🪔✨ Happy Diwali${nm(n)}! Wishing you and your family a prosperous and joyful Diwali. A small digital greeting for you. Regards, Pawan Kumar`,
    special: 'Is Diwali aapko aur aapki team ko tarakki, sukoon aur nayi opportunities mile. Aapke saath kaam karna hamesha ek sunehra safar raha hai.',
    crackers: ['Aapki mehnat ki chamak har jagah roshni phailaye ✨', 'Success aur growth anar ki tarah phoot-phoot kar aaye 🌟', 'Naye saal mein nayi energy aur nayi opportunities ghoomti rahein 🌀', 'Aapka career rocket ki tarah nayi oonchaiyon tak jaaye 🚀', 'Aapke aur aapki team ke liye Maa Lakshmi ka aashirwad 🪔']
  }
}
