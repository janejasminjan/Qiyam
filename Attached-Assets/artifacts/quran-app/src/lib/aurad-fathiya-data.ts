/* ──────────────────────────────────────────────────────────────────
   Aurad Fathiya — structured page-wise text data
   Source: Aurad-e-Fathiya DOCX (Shah Hamadan, d. 786 AH)
   Arabic: extracted verbatim from source document
   Urdu: extracted verbatim from source document
   English: translated from Arabic / cross-referenced with Urdu
   ────────────────────────────────────────────────────────────────── */

export interface AuradFathiyaPage {
  pageNumber: number;
  arabic: string;
  urduTranslation: string;
  englishTranslation: string;
  footnote?: string;
}

export interface AuradFathiyaSection {
  id: string;
  title: string;
  arabicTitle: string;
  description: string;
  pages: AuradFathiyaPage[];
}

/* ══════════════════════════════════════════════════════════════════
   SECTION 1 — AURAD FATHIYA (Main Litany, Pages 4–43)
   ══════════════════════════════════════════════════════════════════ */
const MAIN_PAGES: AuradFathiyaPage[] = [
  {
    pageNumber: 1,
    arabic:
      "بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيمِ ۞\nأَسْتَغْفِرُ اللهَ الْعَظِيمَ (ثَلَاثًا) الَّذِي لَا إِلٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ وَأَتُوبُ إِلَيهِ وَأَسْأَلُهُ التَّوبَةَ\nاللّهُمَّ أَنتَ السَّلامُ وَمِنكَ السَّلامُ وَإِلَيكَ يَرجِعُ السَّلامُ",
    urduTranslation:
      "اللہ کے نام سے شروع کرتاہوں جو بہت ہی مہربان بہت رحم فرمانے والا ہے۔\nمجھے بخشتا چاہتاہوں اللہ بڑے بزرگ و برتر سے۔ اس اللہ کے جس کوئی معبود نہیں مگر وہ جو زندہ اور قائم ہے اور میں اس کی جانب لوٹتا ہوں اور اسی سے توبہ کی توفیق مانگتا ہوں۔ اے اللہ تو ہی سلامتی ہے اور تیری طرف سے سلامتی آتی ہے اور تیری ہی جانب لوٹتی ہے۔",
    englishTranslation:
      "In the name of Allah, the Most Gracious, the Most Merciful.\nI seek forgiveness from Allah the Magnificent (three times), the One besides Whom there is no deity, the Ever-Living, the Self-Sustaining. I turn to Him in repentance and ask Him for the blessing of repentance.\nO Allah, You are Peace, from You is peace, and to You returns all peace.",
    footnote:
      "Shah Hamadanؒ commenced the Aurad with istighfar (seeking forgiveness) so that the reciter may be cleansed of outward and inward sins, and thus become worthy of glorifying and praising Allah and sending blessings upon the Prophet ﷺ with a pure tongue.",
  },
  {
    pageNumber: 2,
    arabic:
      "اَلسَّلامُ حَيَّنا رَبَّنا بِالسَّلامِ وَأَدخِلنا دارَالسَّلامِ تَبَارَكَ رَبَّنا وَتَعالَيتَ يَا ذَا الْجَلالِ وَالْإِكرَامِ ۞\nاللّهُمَّ لَكَ الحَمدُ حَمدًا يُّوَافي نِعمَكَ وَيُكافي مَزيدَ كَرمِكَ احمَدُكَ بِجَميعِ مَحامِدِكَ",
    urduTranslation:
      "سلامتی، زندہ رکھ ہم کو اے ہمارے رب سلامتی کے ساتھ اور داخل کر ہم کو سلامتی کے گھر (یعنی جنت میں) اور تو برکت والا ہے اے ہمارے رب اور تو بلند مرتبہ ہے اے عظمت اور بڑائی والے۔ اے اللہ تیرے ہی لیے ہے تمام تعریف وہ تعریف جو کافی ہو تیری نعمتوں کے لیے اور تیری کرم کی زیادتی کے بدلہ میں، تیری تعریف کرتا ہوں میں تمام ان تعریفوں کے ساتھ۔",
    englishTranslation:
      "O Peace, keep us alive with peace, our Lord, and enter us into the Abode of Peace. Blessed are You, our Lord, and Exalted, O Possessor of Majesty and Honour.\nO Allah, to You belongs all praise — praise that befits Your blessings and matches the abundance of Your generosity. I praise You with all of Your praises.",
    footnote:
      "Shah Hamadanؒ extolled Allah with such breadth and depth that no one can match it. Recite this dhikr with a full sense of servitude and gratitude, acknowledging Allah's countless blessings from the heart and tongue.",
  },
  {
    pageNumber: 3,
    arabic:
      "مَا عَلِمتُ مِنهَا وَمَا لَم أَعلَم وَعَلَى جَمِيعِ نِعَمِكَ مَا عَلِمتُ مِنهَا وَمَالَم أَعلَمُ وَعَلَى كُلِّ حَالٍ\nأَعُوذُ بِاللهِ مِنَ الشَّيطَانِ الرَّجِيمِ ۞\nاللهُ لَا إِلٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ لَا تَأخُذُهُ سِنَةٌ وَّلَا نَومٌ لَّهُ مَا فِي السَّمٰوٰتِ وَمَا فِي الأَرضِ مَن ذَا الَّذِي يَشفَعُ عِندَهُ إِلَّا بِإِذنِهِ يَعلَمُ مَا بَينَ أَيدِيهِم وَمَا خَلفَهُمُ",
    urduTranslation:
      "جن کو میں جانتا ہوں ان (تعریفوں) میں سے اور جن کو میں نہیں جانتا۔ اور تیری تمام نعمتوں پر جن کو میں جانتا ہوں اور جن کو میں نہیں جانتا، اور ہر حال میں۔ پناہ مانگتا ہوں اللہ کی شیطان مردود سے۔ اللہ وہ ہے جس کے علاوہ کوئی معبود نہیں، وہ زندہ اور قائم رہنے والا ہے، نہ اسے اونگھ آتی ہے اور نہ نیند۔ اس کا ہے جو آسمانوں میں ہے اور جو زمین میں ہے۔ کون ہے جو سفارش کر سکے اس کے حضور بغیر اس کی اجازت کے۔ وہ جانتا ہے جو ان کے آگے ہے اور جو ان کے پیچھے ہے۔",
    englishTranslation:
      "…of those I know and those I do not know, and for all Your blessings, those I know and those I do not know, and in every circumstance.\nI seek refuge in Allah from the accursed Satan.\nAllah — there is no deity but Him, the Ever-Living, the Self-Sustaining. Neither slumber nor sleep overtakes Him. To Him belongs all that is in the heavens and the earth. Who can intercede with Him except by His permission? He knows what is before them and what is behind them.",
  },
  {
    pageNumber: 4,
    arabic:
      "وَلَا يُحِيطُونَ بِشَيءٍ مِّن عِلمِهِ إِلَّا بِمَا شَآءَ وَسِعَ كُرسِيُّهُ السَّمٰوتِ وَالأَرضَ وَلَا يَؤُودُهُ حِفظُهُمَا وَهُوَ العَلِيُّ العَظِيمُ ۞\nسُبحَانَ اللهِ ۞ اَلحَمدُ لِلّهِ ۞ اَللهُ أَكبَرُ (33 مرة) ۞\nلَا إِلٰهَ إِلَّا اللهُ وَحدَهُ لَا شَرِيكَ لَهُ لَهُ المُلكُ وَلَهُ الحَمدُ وَهُوَ عَلَى كُلِّ شَيءٍ قَدِيرٌ ۞ (10 مرات)",
    urduTranslation:
      "اور نہیں احاطہ کر سکتے لوگ کچھ بھی اس کے علم کا مگر جو وہ چاہے۔ اس کی کرسی نے آسمانوں کو اور زمین کو گھیر رکھا ہے اور نہیں بوجھ آتا اسے ان کی حفاظت کا اور وہ بالا شان عظمت والا ہے۔\nپاک ہے اللہ — سب تعریفیں اللہ کے لیے ہیں — اللہ سب سے بڑا ہے (33 بار)۔\nنہیں ہے کوئی معبود مگر اللہ جو اکیلا ہے، اس کا کوئی شریک نہیں۔ اسی کے لیے ہے بادشاہی اور اسی کے لیے ہے تعریف اور وہ ہر شے پر قدرت رکھتا ہے (10 بار)۔",
    englishTranslation:
      "They encompass nothing of His knowledge except what He wills. His Kursi extends over the heavens and the earth; preserving them tires Him not. He is the Most High, the Most Great. (Ayat al-Kursi — Quran 2:255)\nGlory be to Allah — All praise is for Allah — Allah is the Greatest (33 times each).\nThere is no deity but Allah, alone, with no partner. His is the dominion and His is all praise, and He has power over all things (10 times).",
    footnote:
      "The Prophet ﷺ said: 'Two words light on the tongue, heavy in the scales, beloved to the Most Merciful — SubhanAllah wa bihamdihi, SubhanAllah al-Azim.' (Bukhari & Muslim)",
  },
  {
    pageNumber: 5,
    arabic:
      "الْمَلِكُ الجَبَّارُ ۞ لَا إِلٰهَ إِلَّا اللهُ الوَاحِدُ القَهَّارُ ۞ لَا إِلٰهَ إِلَّا اللهُ العَزِيزُ الغَفَّارُ ۞ لَا إِلٰهَ إِلَّا اللهُ الكَرِيمُ السَّتَّارُ ۞ لَا إِلٰهَ إِلَّا اللهُ الكَبِيرُ المُتَعَالُ ۞ لَا إِلٰهَ إِلَّا اللهُ خَالِقُ النِّيلِ وَالنَّهَارِ ۞ لَا إِلٰهَ إِلَّا اللهُ المَعبُودُ",
    urduTranslation:
      "جو زبردست اور دیکھنے والا ہے۔ نہیں ہے کوئی معبود مگر اللہ قہار جو واحد ہے۔ نہیں ہے کوئی معبود مگر اللہ عزیز جو بخشنے والا ہے۔ نہیں ہے کوئی معبود مگر اللہ کریم جو پردہ پوشی کرنے والا ہے۔ نہیں ہے کوئی معبود مگر اللہ بزرگ اور بلند مرتبہ۔ نہیں ہے کوئی معبود مگر اللہ جو بنانے والا ہے رات اور دن کا۔ نہیں ہے کوئی معبود مگر اللہ المعبود جس کی ہر شے عبادت کرتی ہے۔",
    englishTranslation:
      "The Sovereign, the Compeller. There is no deity but Allah, the One, the Overwhelming. There is no deity but Allah, the Mighty, the All-Forgiving. There is no deity but Allah, the Generous, the Concealer of faults. There is no deity but Allah, the Great, the Most High. There is no deity but Allah, Creator of night and day. There is no deity but Allah, the Worshipped.",
    footnote:
      "Shah Hamadanؒ accompanied the Kalimah of Tawhid with the noble attributes of Allah to remind the reciter before Whom they are bringing their needs, so that they may affirm: 'I worship the One worthy of all worship.'",
  },
  {
    pageNumber: 6,
    arabic:
      "بِكُلِّ مَكَانٍ ۞ لَا إِلٰهَ إِلَّا اللهُ المَعرُوفُ بِجِلِّ إِحسَانٍ ۞ لَا إِلٰهَ إِلَّا اللهُ كُلُّ يَومٍ هُوَ فِي شَانٍ ۞ لَا إِلٰهَ إِلَّا اللهُ إِيمَانًا بِاللهِ ۞ لَا إِلٰهَ إِلَّا اللهُ أَمَانًا مِنَ اللهِ ۞ لَا إِلٰهَ إِلَّا اللهُ",
    urduTranslation:
      "ہر جگہ۔ نہیں ہے کوئی معبود مگر اللہ جو تمام احسانات کے ساتھ مشہور ہے۔ نہیں ہے کوئی معبود مگر اللہ تعالٰی جس کی ہر روز کی بالکل شان ہے۔ نہیں ہے کوئی معبود مگر اللہ تعالٰی جس پر ہمارا ایمان ہے۔ نہیں ہے کوئی معبود مگر اللہ کی جانب سے ہم امن چاہتے ہیں۔ نہیں ہے کوئی معبود مگر اللہ۔",
    englishTranslation:
      "…in every place. There is no deity but Allah, renowned for His total benevolence. There is no deity but Allah — every day He is engaged in a new matter (Quran 55:29). There is no deity but Allah — we affirm our faith in Allah. There is no deity but Allah — seeking security from Allah. There is no deity but Allah.",
    footnote:
      "Who can count the blessings of Allah? The number of His creations is beyond reckoning. Yet even the smallest dhikr on the tongue earns immense reward before the Almighty.",
  },
  {
    pageNumber: 7,
    arabic:
      "أَمَانَةً مِّن عِندِ اللهِ وَلَا حَول وَلَا قُوَّةً إِلَّا بِاللهِ وَلَا نَعبُدُ إِلَّا إِيَّاهُ\nلَا إِلٰهَ إِلَّا اللهُ حَقًّا ۞ لَا إِلٰهَ إِلَّا اللهُ إِيمَانًا وَصِدقًا ۞ لَا إِلٰهَ إِلَّا اللهُ تَعَبُّدًا وَرِقًّا ۞ لَا إِلٰهَ إِلَّا اللهُ تَلَطُّفًا وَرِفقًا ۞ لَا إِلٰهَ إِلَّا اللهُ قَبلَ كُلِّ شَيءٍ ۞ لَا إِلٰهَ إِلَّا اللهُ بَعدَ كُلِّ شَيءٍ ۞ لَا إِلٰهَ إِلَّا اللهُ يَبقَى رَبُّنَا وَيَفنَى كُلُّ شَيءٍ",
    urduTranslation:
      "یہ اللہ کی طرف سے ایک امانت ہے اور نہیں ہے کوئی قوت اور طاقت مگر اللہ تعالٰی کی طرف سے۔ عبادت کرتے ہیں ہم صرف اللہ تعالٰی کی۔ نہیں ہے کوئی معبود مگر اللہ تعالٰی جو سچ اور حق ہے۔ ایمان اور سچائی سے۔ اللہ کی عبادت اور اس کے غلام کے طور پر۔ اللہ کی مہربانی اور رفاقت کے ساتھ۔ جو پہلے ہے ہر شے سے۔ جو بعد ہے ہر شے کے۔ ہمارا رب جو باقی رہنے والا ہے جب کہ ہر شے فنا ہو جائے گی۔",
    englishTranslation:
      "…a trust from Allah. There is no power or might except with Allah, and we worship none but Him.\nThere is no deity but Allah — truly. There is no deity but Allah — with faith and sincerity. There is no deity but Allah — in full servitude and submission. There is no deity but Allah — in gentleness and harmony. There is no deity but Allah — before all things. There is no deity but Allah — after all things. There is no deity but Allah — our Lord who endures while all things perish.",
  },
  {
    pageNumber: 8,
    arabic:
      "كُلُّ شَيءٍ ۞ لَا إِلٰهَ إِلَّا اللهُ المَلِكُ الحَقُّ الْمُبِينُ ۞ لَا إِلٰهَ إِلَّا اللهُ المَلِكُ الحَقُّ الْيَقِينُ ۞ لَا إِلٰهَ إِلَّا اللهُ العَلِيُّ العَظِيمُ ۞ لَا إِلٰهَ إِلَّا اللهُ الحَلِيمُ الكَرِيمُ ۞ لَا إِلٰهَ إِلَّا اللهُ رَبُّ السَّمٰوٰتِ السَّبعِ وَرَبُّ العَرشِ العَظِيمِ ۞ لَا إِلٰهَ إِلَّا اللهُ أَكرَمُ الأَكرَمِينَ ۞ لَا إِلٰهَ إِلَّا اللهُ أَرحَمُ الرَّاحِمِينَ ۞ لَا إِلٰهَ إِلَّا اللهُ حَبِيبُ التَّوَّابِينَ",
    urduTranslation:
      "سب چیزیں۔ نہیں ہے کوئی معبود مگر اللہ جو سچا بادشاہ اور مبین ہے۔ نہیں ہے کوئی معبود مگر اللہ جو سچا بادشاہ بالکل یقینی۔ نہیں ہے کوئی معبود مگر اللہ عالی مرتبہ بڑا۔ نہیں ہے کوئی معبود مگر اللہ تعالٰی جو بردبار اور فضل کرنے والا ہے۔ نہیں ہے کوئی معبود مگر اللہ جو رب ہے سات آسمانوں کا اور رب عرش عظیم کا۔ نہیں ہے کوئی معبود مگر اللہ تعالٰی جو تمام فضل کرنے والوں سے زیادہ فضل کرنے والا ہے۔ نہیں ہے کوئی معبود مگر اللہ تعالٰی جو تمام رحم کرنے والوں سے زیادہ رحم کرنے والا ہے۔ نہیں ہے کوئی معبود مگر اللہ تعالٰی جو محبت رکھتا ہے توبہ کرنے والوں سے۔",
    englishTranslation:
      "…all things. There is no deity but Allah, the True, Manifest Sovereign. There is no deity but Allah, the True, Certain Sovereign. There is no deity but Allah, the Most High, the Most Great. There is no deity but Allah, the Forbearing, the Generous. There is no deity but Allah, Lord of the seven heavens and Lord of the Mighty Throne. There is no deity but Allah, Most Generous of the generous. There is no deity but Allah, Most Merciful of the merciful. There is no deity but Allah, Beloved of those who repent.",
  },
  {
    pageNumber: 9,
    arabic:
      "لَا إِلٰهَ إِلَّا اللهُ رَاحِمُ المَسَاكِينَ ۞ لَا إِلٰهَ إِلَّا اللهُ هَادِي المُضِلِّينَ ۞ لَا إِلٰهَ إِلَّا اللهُ دَلِيلُ الحَائِرِينَ ۞ لَا إِلٰهَ إِلَّا اللهُ دَلِيلُ المُتَحَيِّرِينَ ۞ لَا إِلٰهَ إِلَّا اللهُ أَمَانُ الخَائِفِينَ ۞ لَا إِلٰهَ إِلَّا اللهُ غِيَاثُ المُستَغِيثِينَ ۞ لَا إِلٰهَ إِلَّا اللهُ خَيرُ النَّاصِرِينَ ۞",
    urduTranslation:
      "نہیں ہے کوئی معبود مگر اللہ تعالٰی جو رحم کرنے والا ہے مسکینوں پر۔ نہیں ہے کوئی معبود مگر اللہ تعالٰی، ہدایت دینے والا گمراہوں کو۔ نہیں ہے کوئی معبود مگر اللہ تعالٰی جو رہنما ہے بھٹکے ہوؤں کا۔ نہیں ہے کوئی معبود مگر اللہ تعالٰی جو رہنما ہے سوچنے والوں کا۔ نہیں ہے کوئی معبود مگر اللہ تعالٰی جو پناہ ہے خوفزدوں کا۔ نہیں ہے کوئی معبود مگر اللہ تعالٰی فریاد سننے والا۔ نہیں ہے کوئی معبود مگر اللہ تعالٰی جو سب سے بہتر مدد کرنے والا ہے۔",
    englishTranslation:
      "There is no deity but Allah, Compassionate to the poor. There is no deity but Allah, Guide of the misguided. There is no deity but Allah, Guide of the lost. There is no deity but Allah, Guide of the bewildered. There is no deity but Allah, Security for the fearful. There is no deity but Allah, Refuge of those who cry for help. There is no deity but Allah, the Best of helpers.",
    footnote:
      "Repeating this noble phrase during times of difficulty brings tranquility to the heart and ease in one's affairs.",
  },
  {
    pageNumber: 10,
    arabic:
      "لَا إِلٰهَ إِلَّا اللهُ خَيرُ الحَافِظِينَ ۞ لَا إِلٰهَ إِلَّا اللهُ خَيرُ الوَارِثِينَ ۞ لَا إِلٰهَ إِلَّا اللهُ خَيرُ الحَاكِمِينَ ۞ لَا إِلٰهَ إِلَّا اللهُ خَيرُ الرَّازِقِينَ ۞ لَا إِلٰهَ إِلَّا اللهُ خَيرُ الفَاتِحِينَ ۞ لَا إِلٰهَ إِلَّا اللهُ خَيرُ الغَافِرِينَ ۞ لَا إِلٰهَ إِلَّا اللهُ خَيرُ الرَّاحِمِينَ ۞ لَا إِلٰهَ إِلَّا اللهُ وَحدَهُ وَصَدَقَ وَعدَهُ وَنَصَرَ عَبدَهُ وَأَعَزَّ جُندَهُ وَهَزَمَ الأَحزَابَ وَحدَهُ وَلَا شَيءَ بَعدَهُ",
    urduTranslation:
      "نہیں ہے کوئی معبود سوا اللہ تعالٰی کے جو سب سے بہتر حفاظت کرنے والا ہے۔ بہتر ہے تمام وارثوں سے۔ تمام حاکموں سے بہتر۔ رزق دینے والوں میں سب سے بہتر۔ سب سے بہتر فتح دلانے والا۔ سب سے بہتر بخشنے والا۔ سب سے زیادہ رحم کرنے والا۔ نہیں ہے کوئی معبود مگر اللہ اکیلا جس نے اپنے وعدے کو پورا کیا، اپنے بندے کی مدد کی، اپنے لشکر کو عزت بخشی اور اتحادی لشکروں کو اکیلے مار بھگایا اور اس کے بعد اس کے کوئی چیز نہیں۔",
    englishTranslation:
      "There is no deity but Allah, Best of guardians. Best of inheritors. Best of judges. Best of providers. Best of those who grant victory. Best of forgivers. Most merciful of the merciful. There is no deity but Allah alone, who fulfilled His promise, gave victory to His servant, honoured His army, and routed the confederates single-handedly — and after Him there is nothing.",
  },
  {
    pageNumber: 11,
    arabic:
      "لَا إِلٰهَ إِلَّا اللهُ أَهلُ النِّعمَةِ وَلَهُ الفَضلُ وَلَهُ الثَّنَآءُ الحَسَنُ\nلَا إِلٰهَ إِلَّا اللهُ وَلَا نَعبُدُ إِلَّا إِيَّاهُ مُخلِصِينَ لَهُ الدِّينَ وَلَو كَرِهَ الكَافِرُونَ ۞\nلَا إِلٰهَ إِلَّا اللهُ عَدَدَ خَلقِهِ وَزِنَةَ عَرشِهِ وَرِضَاءَ نَفسِهِ وَمِدَادَ كَلِمَاتِهِ\nلَا إِلٰهَ إِلَّا اللهُ الصَّاحِبُ الوَحدَانِيَّةِ الفَردَانِيَّةِ",
    urduTranslation:
      "نہیں ہے کوئی معبود مگر اللہ تعالٰی جو لائق نعمت ہے۔ اور اس کے پاس فضل ہے اور وہی ہے تمام ستائش کا سزاوار۔ نہیں ہے کوئی معبود مگر اللہ تعالٰی اور ہم نہیں عبادت کرتے سوا اس کے، خالص اس کے لیے دین کے ساتھ اگرچہ برا لگے کافروں کو۔ نہیں ہے کوئی معبود مگر اللہ تعالٰی اس کی مخلوق کی تعداد کے برابر اور اس کے عرش کے وزن کے برابر اور اس کی رضا کے برابر اور اس کے کلمات کی وسعت کے برابر۔ نہیں ہے کوئی معبود مگر اللہ تعالٰی جو واحد ہے اپنی ذات میں اکیلا۔",
    englishTranslation:
      "There is no deity but Allah, worthy of all favour; to Him belongs all grace and all beautiful praise.\nThere is no deity but Allah — we worship none but Him, with sincere dedication, even if the disbelievers hate it.\nThere is no deity but Allah — by the number of His creation, the weight of His Throne, to the extent of His pleasure, and by the ink of His Words.\nThere is no deity but Allah, the Possessor of absolute Oneness and absolute Uniqueness.",
    footnote:
      "The first Kalimah is enumerated here as: equal to the number of His creation, equal to the weight of His Throne, to the extent of His pleasure, and as vast as His Words. (Reference: Sahih Muslim)",
  },
  {
    pageNumber: 12,
    arabic:
      "الْقَدِيمِيَّةِ الأَزَلِيَّةِ الأَبَدِيَّةِ لَيسَ لَهُ ضِدٌّ وَلَا نِدٌّ وَلَا شِبهَهُ وَلَا شَرِيكَ\nلَا إِلٰهَ إِلَّا اللهُ وَحدَهُ لَا شَرِيكَ لَهُ لَهُ المُلكُ وَلَهُ الحَمدُ يُحيَي وَيُمِيتُ وَهُوَ حَيٌّ لَّا يَمُوتُ بِيَدِهِ الخَيرُ وَهُوَ عَلَى كُلِّ شَيءٍ قَدِيرٌ ۞ وَإِلَيهِ المَصِيرُ\nهُوَ الأَوَّلُ وَالآخِرُ وَالظَّاهِرُ وَالبَاطِنُ وَهُوَ بِكُلِّ شَيءٍ عَلِيمٌ ۞\nلَيسَ كَمِثلِهِ",
    urduTranslation:
      "ہمیشہ سے ہے۔ ازلی، ابدی۔ اس کا کوئی مقابل نہیں اور نہ اس کا کوئی مثل ہے اور نہ اس کا کوئی شریک ہے۔ نہیں ہے کوئی معبود مگر اللہ تعالٰی اکیلا، اس کا کوئی شریک نہیں، تمام ملک اس کا ہے اور تمام ثنا اس کی ہے۔ وہ زندہ کرتا ہے اور مارتا ہے اور وہ ہمیشہ زندہ ہے جو نہیں مرے گا۔ تمام خیر اس کے ہاتھ میں ہے اور وہ ہر چیز پر قادر ہے۔ اور اسی کی طرف لوٹنا ہے۔ وہ اول ہے اور آخر ہے اور ظاہر ہے اور باطن ہے اور وہ ہر چیز کو جاننے والا ہے۔ اس کے مثل کوئی نہیں۔",
    englishTranslation:
      "…the Ancient, the Pre-eternal, the Everlasting. He has no opposite, no equal, no likeness, no partner.\nThere is no deity but Allah, alone, with no partner. His is the dominion and His is all praise. He gives life and causes death, and He is Living and will never die. In His hand is all goodness, and He has power over all things. And to Him is the return.\nHe is the First and the Last, the Manifest and the Hidden, and He has full knowledge of all things.\nThere is nothing like Him.",
  },
  {
    pageNumber: 13,
    arabic:
      "شَيءٌ وَهُوَ السَّمِيعُ البَصِيرُ\n(حَسبُنَا اللهُ وَنِعمَ الوَكِيلُ نِعمَ المَولٰى وَنِعمَ النَّصِيرُ) (ثَلَاثًا)\nرَبَّنَا وَإِلَيكَ المَصِيرُ\nاللّهُمَّ لَا مَانِعَ لِمَا أَعطَيتَ وَلَا مُعطِيَ لِمَا مَنَعتَ",
    urduTranslation:
      "چیز نہیں اور وہ سننے والا اور دیکھنے والا ہے۔ ہمارے لیے کافی ہے اللہ تعالٰی اور بہترین کارساز، اور بہترین مالک اور بہترین مددگار (تین بار)۔ اے ہمارے رب! تیری ہی طرف لوٹنا ہے۔ اے اللہ! نہیں ہے کوئی روکنے والا جو تو عطا کرے اور نہیں ہے کوئی عطا کرنے والا جو تو روک دے۔",
    englishTranslation:
      "…thing, and He is the All-Hearing, the All-Seeing.\nAllah is sufficient for us and He is the Best Disposer of affairs; the Best Protector and the Best Helper (three times).\nOur Lord, to You is the return.\nO Allah, none can withhold what You give, and none can give what You withhold.",
    footnote:
      "This supplication is validated by the Quran: 'Those to whom people said, Indeed the people have gathered against you so fear them, but it only increased them in faith, and they said: Sufficient for us is Allah, and He is the best Disposer of affairs.' (Quran 3:173)",
  },
  {
    pageNumber: 14,
    arabic:
      "وَلَا مُبَدِّلَ لِمَا حَكَمتَ وَلَا يَنفَعُ ذَا الجَدِّ مِنكَ الجَدُّ\nسُبحَانَ رَبِّيَ العَلِيِّ الأَعلَى الوَهَّابِ\nسُبحَانَ رَبِّيَ العَلِيِّ الأَعلَى الوَهَّابِ الكَرِيمِ\nسُبحَانَ رَبِّي العَلِيِّ الأَعلَى الوَهَّابِ الكَرِيمِ الرَّزَّاقِ",
    urduTranslation:
      "اور نہیں بدلنے والا جو تو نے فیصلہ کر دیا، اور نہیں نفع دیتی بڑائی کسی بڑے آدمی کو تیرے مقابلہ میں۔ پاک ہے میرا رب جو بلند شان اور بلند مرتبہ اور عطا کرنے والا ہے۔ پاک ہے میرا رب جو عالی شان، بلند مرتبہ، عطا کرنے والا، کرم کرنے والا ہے۔ پاک ہے میرا رب جو عالی شان، بلند مرتبہ، عطا کرنے والا، کرم کرنے والا، رزق دینے والا ہے۔",
    englishTranslation:
      "And none can change what You have decreed, and worldly rank does not benefit its owner before You.\nGlory be to my Lord, the Most High, the Most Exalted, the Bestower.\nGlory be to my Lord, the Most High, the Most Exalted, the Bestower, the Generous.\nGlory be to my Lord, the Most High, the Most Exalted, the Bestower, the Generous, the Provider.",
    footnote:
      "No matter how much we worship, it falls short, and we should be grateful even for that. For Allah's blessings cannot be counted: 'If you were to count the blessings of Allah, you could not enumerate them.' (Quran 14:34)",
  },
  {
    pageNumber: 15,
    arabic:
      "حَقَّ مَعرِفَتِكَ سُبحَانَكَ مَا ذَكَرنَاكَ حَقَّ ذِكرِكَ سُبحَانَكَ مَا شَكَرنَاكَ حَقَّ شُكرِكَ\nاللهُ سُبحَانَ اللهِ الأَبَدِ الأَبَدِ\nسُبحَانَ اللهِ الوَاحِدِ الأَحَدِ\nسُبحَانَ اللهِ الفَردِ الصَّمَدِ",
    urduTranslation:
      "جیسی تیری ذات کو پہچاننے کا حق تھا۔ پاک ہے تیری ذات اے اللہ ہم نے تجھے یاد نہیں کیا جیسے تجھے یاد کرنے کا حق تھا۔ پاک ہے تیری ذات اے اللہ ہم نے تیرا شکر نہیں ادا کیا جیسا تجھے شکر ادا کرنے کا حق تھا۔ پاک ہے اللہ، ہمیشہ ہمیشہ کے لیے۔ پاک ہے اللہ جو واحد اور احد ہے۔ پاک ہے اللہ جو اکیلا اور بے نیاز ہے۔",
    englishTranslation:
      "…as is Your right to be known. Glory be to You, O Allah, we did not remember You as is Your right to be remembered. Glory be to You, O Allah, we did not thank You as You deserve to be thanked.\nGlory be to Allah, forever and ever.\nGlory be to Allah, the One, the Unique.\nGlory be to Allah, the Singular, the Self-Sufficient.",
  },
  {
    pageNumber: 16,
    arabic:
      "كُفُوًا أَحَدٌ ۞\nسُبحَانَ المَلِكِ القُدُّوسِ\nسُبحَانَ ذِي المُلكِ وَالمَلَكُوتِ\nسُبحَانَ ذِي العِزَّةِ وَالعَظَمَةِ وَالقُدرَةِ وَالهَيبَةِ وَالجَلالِ وَالجَمَالِ وَالكَمَالِ وَالبَقَاءِ وَالثَّنَاءِ",
    urduTranslation:
      "اس کا ہمسر ہے۔ پاک ہے وہ بادشاہ پاک ذات۔ پاک ہے وہ جو تمام بادشاہی اور عالم باطن کا مالک ہے۔ پاک ہے وہ جو عزت اور عظمت اور قدرت اور ہیبت اور جلال اور خوبیاں اور کمال اور بقاء اور ستائش کا مالک ہے۔",
    englishTranslation:
      "…none is equal to Him.\nGlory be to the Sovereign, the All-Holy.\nGlory be to the Possessor of all dominion and sovereignty.\nGlory be to the Possessor of Might, Magnificence, Power, Awe, Majesty, Beauty, Perfection, Eternity, and Praise.",
    footnote:
      "The Exalted One is pure from any comparison. 'There is nothing like Him, and He is the All-Hearing, the All-Seeing.' (Quran 42:11)",
  },
  {
    pageNumber: 17,
    arabic:
      "الْحَيُّ الَّذِي لَا يَنَامُ وَلَا يَمُوتُ سُبُّوحٌ قُدُّوسٌ رَبُّنَا وَرَبُّ المَلَائِكَةِ وَالرُّوحِ\nسُبحَانَ اللهِ وَالحَمدُ لِلَّهِ وَلَا إِلٰهَ إِلَّا اللهُ وَاللهُ أَكبَرُ وَلَا حَولَ وَلَا قُوَّةَ إِلَّا بِاللهِ العَلِيِّ العَظِيمِ",
    urduTranslation:
      "ہمیشہ زندہ رہنے والے جو نہ سوتا ہے اور نہ مرتا ہے، تعریف کے قابل پاک ہے، پروردگار ہمارا ہے اور پروردگار فرشتوں اور روح کا۔ پاک ہے اللہ اور حمد اللہ کے لیے ہے اور لائق عبادت کوئی نہیں مگر اللہ اور اللہ سب سے بڑا ہے اور نہیں ہے کوئی قوت اور طاقت مگر اللہ عالی شان عظیم کے ساتھ۔",
    englishTranslation:
      "The Ever-Living who neither sleeps nor dies. Glorified, Holy — our Lord and Lord of the angels and the Spirit.\nGlory be to Allah, and all praise is for Allah, and there is no deity but Allah, and Allah is the Greatest, and there is no power or might except with Allah, the Most High, the Most Great.",
  },
  {
    pageNumber: 18,
    arabic:
      "يَاعَزِيزُ يَاجَبَّارُ يَامُتَكَبِّرُ يَا خَالِقُ يَا بَارِئُ يَا مُصَوِّرُ يَا غَفَّارُ يَا قَهَّارُ يَا وَهَّابُ يَا رَزَّاقُ يَا فَتَّاحُ يَا عَلِيمُ يَا قَابِضُ يَا بَاسِطُ يَا خَافِضُ يَا رَافِعُ يَا مُعِزُّ يَا مُذِلُّ يَا سَمِيعُ يَا بَصِيرُ يَا حَكَمُ يَا عَدلُ يَا لَطِيفُ يَا خَبِيرُ يَا حَلِيمُ يَا عَظِيمُ يَا غَفُورُ يَا شَكُورُ يَا عَلِيُّ يَا كَبِيرُ",
    urduTranslation:
      "اے غالب، اے ہر رتبے کا اختیار رکھنے والے، اے پیدا کرنے والے، اے صورت بنانے والے، اے بخشنے والے، اے زبردست۔ اے بہت بخشنے والے، اے رزق دینے والے، اے مشکل کشا، اے جاننے والے۔ اے بند کرنے والے، اے کھولنے والے، اے پست کرنے والے، اے بلند کرنے والے۔ اے عزت دینے والے، اے ذلیل کرنے والے، اے سننے والے، اے دیکھنے والے۔ اے فیصلہ کرنے والے، اے انصاف کرنے والے، اے مہربان، اے خبر رکھنے والے۔ اے بردبار، اے عظیم، اے بخشنے والے، اے قدردان، اے عالی مرتبہ، اے بڑے۔",
    englishTranslation:
      "O Mighty, O Compeller, O Proud, O Creator, O Originator, O Fashioner, O Most Forgiving, O Subduer, O Bestower, O Provider, O Opener, O All-Knowing, O Constrictor, O Expander, O Humbler, O Exalter, O Honourer, O Dishonourer, O All-Hearing, O All-Seeing, O Judge, O Just, O Subtle, O All-Aware, O Forbearing, O Magnificent, O Most Forgiving, O Appreciative, O Most High, O Most Great.",
    footnote:
      "Allah has 99 names. 'And to Allah belong the Most Beautiful Names, so invoke Him by them.' (Quran 7:180). Hadith: 'Whoever memorises them will enter Paradise.' (Bukhari & Muslim)",
  },
  {
    pageNumber: 19,
    arabic:
      "يَا عَلِيُّ يَا كَبِيرُ يَا حَفِيظُ يَا مُقِيتُ يَا حَسِيبُ يَا جَلِيلُ يَا كَرِيمُ يَا رَقِيبُ يَا مُجِيبُ يَا وَاسِعُ يَا حَكِيمُ يَا وَدُودُ يَا مَجِيدُ يَا بَاعِثُ يَا شَهِيدُ يَا حَقُّ يَا وَكِيلُ يَا قَوِيُّ يَا مَتِينُ يَا وَلِيُّ يَا حَمِيدُ يَا مُحصِي يَا مُبدِئُ يَا مُعِيدُ يَا مُحيِي يَا مُمِيتُ يَا حَيُّ يَا قَيُّومُ يَا وَاجِدُ يَا مَاجِدُ يَا وَاحِدُ يَا أَحَدُ يَا صَمَدُ",
    urduTranslation:
      "اے عالی مرتبہ، اے بڑے، اے حفاظت کرنے والے، اے روزی دینے والے، اے حساب رکھنے والے، اے بے نیاز، اے کرم کرنے والے، اے نگہبان۔ اے دعا قبول کرنے والے، اے بڑھانے والے، اے حکیم، اے دوستی کرنے والے، اے بزرگی والے، اے اٹھانے والے، اے گواہ، اے حق، اے کارساز۔ اے قوت والے، اے مضبوط، اے مددگار، اے قابل ستائش، اے گنہ کرنے والے، اے پہلے سے پیدا کرنے والے، اے دوبارہ پیدا کرنے والے، اے زندگی دینے والے، اے موت دینے والے، اے زندہ، اے قائم رہنے والے، اے پانے والے، اے بزرگی والے، اے واحد، اے اکیلے، اے بے نیاز۔",
    englishTranslation:
      "O Most High, O Most Great, O Preserver, O Sustainer, O Reckoner, O Majestic, O Generous, O Watchful, O Responsive, O All-Encompassing, O Wise, O Loving, O Glorious, O Resurrector, O Witness, O Truth, O Trustee, O Strong, O Firm, O Protecting Friend, O Praiseworthy, O Counter, O Originator, O Restorer, O Life-Giver, O Death-Giver, O Ever-Living, O Self-Sustaining, O Finder, O Glorious, O One, O Unique, O Self-Sufficient.",
  },
  {
    pageNumber: 20,
    arabic:
      "يَا صَمَدُ يَا قَادِرُ يَا مُقتَدِرُ يَا مُقَدِّمُ يَا مُؤَخِّرُ يَا أَوَّلُ يَا آخِرُ يَا ظَاهِرُ يَا بَاطِنُ يَا وَالِي يَا مُتَعَالِي يَا بَرُّ يَا تَوَّابُ يَا مُنعِمُ يَا مُنتَقِمُ يَا عَفُوُّ يَا رَءُوفُ يَا مَالِكَ المُلكِ يَا ذَا الجَلالِ وَالإِكرَامِ يَا مُقسِطُ يَا جَامِعُ يَا غَنِيُّ يَا مُغنِي يَا مَانِعُ يَا ضَارُّ يَا نَافِعُ يَا نُورُ يَا هَادِي يَا بَدِيعُ",
    urduTranslation:
      "اے بے نیاز، اے قدرت رکھنے والے، اے اقتدار والے، اے مقدّم کرنے والے، اے مؤخر کرنے والے، اے سب سے اول، اے سب سے آخر، اے ظاہر، اے پوشیدہ رہنے والے، اے مالک، اے عالی شان، اے مہربان، اے توبہ قبول کرنے والے، اے نعمت دینے والے، اے بدلہ لینے والے، اے معاف کرنے والے، اے رحم کرنے والے، اے تمام سلطنت کے مالک، اے عظمت اور اکرام والے، اے انصاف کرنے والے، اے جمع کرنے والے، اے غنی، اے غنی کرنے والے، اے روکنے والے، اے نقصان دینے والے، اے نفع دینے والے، اے نور، اے ہدایت دینے والے، اے پیدا کرنے والے۔",
    englishTranslation:
      "O Self-Sufficient, O Able, O Determiner, O Advancer, O Delayer, O First, O Last, O Manifest, O Hidden, O Governor, O Most Exalted, O Righteous, O Accepter of Repentance, O Bestower of Blessings, O Avenger, O Pardoner, O Compassionate, O Owner of All Sovereignty, O Possessor of Majesty and Honour, O Equitable, O Gatherer, O Self-Sufficient, O Enricher, O Preventer, O Distressor, O Benefiter, O Light, O Guide, O Originator.",
  },
  {
    pageNumber: 21,
    arabic:
      "يَا بَدِيعُ يَا بَاقِي يَا وَارِثُ يَا رَشِيدُ يَا صَبُورُ يَا صَادِقُ يَا سَتَّارُ\nيَا مَن تَقَدَّسَ عَنِ الأَشبَاهِ ذَاتُهُ وَتَنَزَّهَ عَن مُشَابَهَةِ الأَمثَالِ صِفَاتُهُ وَدَلَّت عَلٰى وَحدَانِيَّتِهِ مَصنُوعَاتُهُ",
    urduTranslation:
      "اے ایجاد کرنے والے، اے ہمیشہ رہنے والے، اے مالک، اے راہ دکھانے والے، اے صبر کرنے والے، اے سچے، اے پردہ کرنے والے۔ اے وہ کہ جس کی ذات (کسی کی برابری) سے پاک ہے اور اس کی صفات کسی سے مشابہت سے بالاتر ہیں، اور اس کی بنائی ہوئی مخلوق اس کی واحدانیت کی گواہی دیتی ہے۔",
    englishTranslation:
      "O Originator, O Everlasting, O Inheritor, O Guide to the Right Path, O Patient, O Truthful, O Concealer of Faults.\nO You whose Essence is transcendent above all likeness, whose Attributes are beyond all similarity, and whose creations bear witness to His Oneness.",
    footnote:
      "The divine attributes cannot be compared to any created thing. 'There is nothing like Him, and He is the All-Hearing, the All-Seeing.' (Quran 42:11)",
  },
  {
    pageNumber: 22,
    arabic:
      "رُبُوبِيَّتَهُ مَصنُوعَاتُهُ وَاحِدٌ لَا مِن قِلَّةٍ ۞ وَمَوجُودٌ لَا مِن عِلَّةٍ ۞\nيَا مَن هُوَ بِالبِرِّ مَعرُوفٌ وَبِالإِحسَانِ مَوصُوفٌ مَعرُوفٌ بِلَا غَايَةٍ وَمَوصُوفٌ بِلَا نِهَايَةٍ أَوَّلٌ قَبلَ كُلِّ شَيءٍ",
    urduTranslation:
      "اس کی ربوبیت کی گواہی دیتی ہیں اس کی بنائی ہوئی مخلوق، وہ واحد ہے مگر کمی کی وجہ سے نہیں۔ اور موجود ہے بغیر کسی سبب کے۔ اے وہ جو نیکوں کی وجہ سے مشہور ہے اور احسان کے ساتھ بیان کیا جاتا ہے، مشہور بے انتہا اور موصوف بے حد، اول ہے ہر چیز سے پہلے۔",
    englishTranslation:
      "…His creations testify to His Lordship. He is One — not from scarcity. He exists — without cause.\nO You who are known for Your goodness and described through Your benevolence, known without limit and described without end, the First before all things.",
    footnote:
      "The Oneness of Allah is not like the oneness of a number — it is absolute and unique, with no equal or parallel.",
  },
  {
    pageNumber: 23,
    arabic:
      "وَآخِرٌ كَرِيمٌ بِلَا إِنتِهَاءٍ وَغَفرُ ذُنُوبَ المُذنِبِينَ كَرَمًا وَحِلمًا\nيَا مَن لَّيسَ كَمِثلِهِ شَيءٌ وَهُوَ السَّمِيعُ البَصِيرُ\nحَسبُنَا اللهُ وَنِعمَ الوَكِيلُ نِعمَ المَولٰى وَنِعمَ النَّصِيرُ",
    urduTranslation:
      "اور آخر کرم کرنے والا بغیر کسی انتہاء کے اور بخشنے والا ہے گناہگاروں کے گناہ اپنے کرم اور بردباری کے۔ اے وہ جو اس کی مثل کوئی شے نہیں ہے اور وہ سننے والا اور دیکھنے والا ہے۔ ہمارے لیے کافی ہے اللہ اور بہترین کارساز، بہترین مالک اور بہترین مددگار۔",
    englishTranslation:
      "…and the Last, Generous without end, and He forgives the sins of sinners through His grace and forbearance.\nO You, nothing is like Him, and He is the All-Hearing, the All-Seeing.\nAllah is sufficient for us and He is the Best Disposer of affairs; the Best Protector and the Best Helper.",
    footnote:
      "His existence has no need of cause or reason. The Exalted is Self-Sufficient. Allah said: 'Indeed, Allah is self-sufficient, free of need.' (Quran 3:97)",
  },
  {
    pageNumber: 24,
    arabic:
      "بِلَا فَنَاءٍ وَيَا قَائِمًا بِلَا زَوَالٍ وَيَا مُدَبِّرًا بِلَا وَزِيرٍ\nسَهِّل عَلَينَا وَعَلَى وَالِدِينَا كُلَّ عَسِيرٍ\nلَا أُحصِي ثَنَاءً عَلَيكَ أَنتَ كَمَا أَثنَيتَ عَلَى نَفسِكَ",
    urduTranslation:
      "فنا کے بغیر اور اے قائم رہنے والے بلا زوال اور اے مدبّر بلا وزیر، آسان کر ہم پر اور ہمارے والدین پر تمام مشکلات۔ نہیں سکتا میں تمام تعریف و ثناء شمار کر سکتا کہ جیسی تیری ذات کو تعریف و ثناء ہے، تو ہے جیسی تو نے اپنی تعریف اپنے آپ کی کی ہے۔",
    englishTranslation:
      "…without perishing. O the Ever-Standing without decline. O the Governor without any minister.\nMake easy for us and for our parents every difficulty.\nI cannot enumerate Your praises — You are as You have praised Yourself.",
  },
  {
    pageNumber: 25,
    arabic:
      "تَصِيرُ الأُمُورُ كُلُّ شَيءٍ هَالِكٌ إِلَّا وَجهَهُ لَهُ الحُكمُ وَإِلَيهِ تُرجَعُونَ\nفَسَيَكفِيكَهُمُ اللهُ وَهُوَ السَّمِيعُ العَلِيمُ\nحَسبُنَا اللهُ وَكَفَى سَمِعَ اللهُ لِمَن دَعَا لَيسَ وَرَاءَ اللهِ مَرمَى",
    urduTranslation:
      "کی طرف لوٹ جاتے ہیں سب کام، ہر چیز ہلاک ہو جانے والی ہے سوا اس کے چہرے کے، اسی کا فیصلہ آخری ہے اور اسی کی طرف سب لوٹائے جانے والے ہیں۔ پس کافی ہے اللہ تعالٰی تیرے لیے، سنتا ہے، جاننے والا ہے۔ کافی ہے اللہ تعالٰی اور کافی ہے، سنتا ہے اللہ تعالٰی اس کی جو دعا کرتا ہے۔ اللہ کے آگے کوئی اور نشانہ نہیں ہے۔",
    englishTranslation:
      "…all affairs return. Everything is perishing except His Face. His is the command, and to Him you will be returned. (Quran 28:88)\nAllah will suffice for you against them, and He is the All-Hearing, the All-Knowing. (Quran 2:137)\nAllah is sufficient and that is enough. Allah hears the one who supplicates. There is no goal beyond Allah.",
    footnote:
      "Nothing can intercede or prevent Allah's decree. 'Indeed, Allah is witness over all things.' (Quran 58:6)",
  },
  {
    pageNumber: 26,
    arabic:
      "رَبَّا رَّحِيمًا وَّلَا يَزَالُ كَرِيمًا\nلَا إِلٰهَ إِلَّا اللهُ الحَلِيمُ الكَرِيمُ\nسُبحَانَ اللهُ وَتَبَارَكَ اللهُ رَبُّ السَّمٰوٰتِ السَّبعِ وَرَبُّ العَرشِ العَظِيمِ\nوَالحَمدُ لِلَّهِ رَبِّ العَالَمِينَ",
    urduTranslation:
      "رب پروردگار ہے اور ہمیشہ فضل و کرم کرتا رہے گا۔ کوئی معبود نہیں ہے مگر اللہ تعالٰی وہ بردبار، فضل کرنے والا۔ پاک ہے اللہ اور برکت والا ہے اللہ تعالٰی وہ پالنے والا سات آسمانوں کا اور پالنے والا ہے عرش عظیم کا۔ اور تمام تعریفیں اللہ تعالٰی کے لیے ہیں جو تمام جہانوں کا پالنے والا ہے۔",
    englishTranslation:
      "…the Lord Most Merciful, ever generous.\nThere is no deity but Allah, the Forbearing, the Generous.\nGlory be to Allah, and blessed is Allah, Lord of the seven heavens and Lord of the Mighty Throne.\nAnd all praise is for Allah, Lord of all the worlds.",
  },
  {
    pageNumber: 27,
    arabic:
      "وَلَدًا وَّلَم يَكُن لَّهُ شَرِيكٌ فِي المُلكِ وَلَم يَكُن لَّهُ وَلِيٌّ مِّن الذُّلِّ وَكَبِّرهُ تَكبِيرًا\nاللهُ أَكبَرُ\nحَسبُنَا اللهُ وَلِدِينَنَا وَحَسبُنَا اللهُ لِدُنيَانَا حَسبُنَا اللهُ لِمَا",
    urduTranslation:
      "فرزند ہے اور نہیں ہے اس کا کوئی شریک سلطنت میں اور نہیں ہے اس کا کوئی نائب کمزوری کی وجہ سے، اور بیان کر اس کی بزرگی کا ذکر بہت کریں۔ اللہ سب سے بڑا ہے۔ کافی ہے اللہ تعالٰی ہمارے دین کے لیے، کافی ہے اللہ تعالٰی ہماری دنیا کے لیے، کافی ہے اللہ تعالٰی ہمارے لیے جو۔",
    englishTranslation:
      "…and has no child, no partner in His dominion, and no protector out of weakness. Glorify Him with all glorification.\nAllah is the Greatest.\nAllah is sufficient for us in our religion, sufficient in our worldly affairs, sufficient for us in all…",
    footnote:
      "Is not Allah sufficient for His servant? (Quran 39:36). Allah suffices in every matter — for faith, for this world, against enemies, in the grave, in judgment, and in all circumstances.",
  },
  {
    pageNumber: 28,
    arabic:
      "اللهُ لِمَن حَسَدَنَا حَسبُنَا اللهُ لِمَن كَادَنَا بِسُوءٍ حَسبُنَا اللهُ عِندَ القَبرِ حَسبُنَا اللهُ عِندَ المَسَائِلِ حَسبُنَا اللهُ عِندَ الصِّرَاطِ حَسبُنَا اللهُ عِندَ الحِسَابِ حَسبُنَا اللهُ عِندَ المِيزَانِ حَسبُنَا اللهُ حِينَ لَا يَنفَعُ مَالٌ وَلَا بَنُونَ إِلَّا مَن أَتَى اللهَ بِقَلبٍ سَلِيمٍ",
    urduTranslation:
      "کافی ہے اللہ تعالٰی ہمارے لیے اس شخص کے خلاف جس نے ہم سے حسد کیا، کافی ہے اللہ تعالٰی اس کے لیے جو برا چاہتا ہے ہمارا۔ کافی ہے اللہ تعالٰی قبر کے وقت، کافی ہے اللہ تعالٰی سوال و جواب کے وقت، کافی ہے اللہ تعالٰی پل صراط پر، کافی ہے اللہ تعالٰی حساب کے وقت، کافی ہے اللہ تعالٰی میزان پر، کافی ہے اللہ تعالٰی جب نہ مال کام آئے گا اور نہ اولاد، مگر وہ جو اللہ کے پاس سالم دل لے کر آئے۔",
    englishTranslation:
      "Allah is sufficient for us against those who envy us. Allah is sufficient for us against those who plot evil against us. Allah is sufficient for us in the grave. Allah is sufficient for us at the questioning. Allah is sufficient for us on the Bridge. Allah is sufficient for us at the Reckoning. Allah is sufficient for us at the Scales. Allah is sufficient for us when neither wealth nor children avail — except the one who comes to Allah with a sound heart. (Quran 26:88-89)",
  },
  {
    pageNumber: 29,
    arabic:
      "وَإِلَيهِ أُنِيبُ\nلَا إِلٰهَ إِلَّا اللهُ سُبحَانَ اللهِ مَا أَعظَمَ اللهَ\nلَا إِلٰهَ إِلَّا اللهُ سُبحَانَ اللهِ مَا أَحلَمَ اللهَ\nلَا إِلٰهَ إِلَّا اللهُ سُبحَانَ اللهِ مَا أَكرَمَ اللهَ\nلَا إِلٰهَ إِلَّا اللهُ سُبحَانَ اللهِ مَا أَرحَمَ اللهَ",
    urduTranslation:
      "اور اسی کی طرف لوٹنا ہے مجھے۔ نہیں ہے کوئی معبود مگر اللہ تعالٰی، پاک ہے اللہ تعالٰی کتنا بڑا ہے اللہ تعالٰی۔ نہیں ہے کوئی معبود مگر اللہ، پاک ہے اللہ تعالٰی کتنا بردبار ہے اللہ تعالٰی۔ نہیں ہے کوئی معبود مگر اللہ، پاک ہے اللہ تعالٰی کتنا کریم ہے اللہ تعالٰی۔ نہیں ہے کوئی معبود مگر اللہ، پاک ہے اللہ تعالٰی کتنا رحیم ہے اللہ تعالٰی۔",
    englishTranslation:
      "…and to Him I return.\nThere is no deity but Allah — glory be to Allah, how great is Allah!\nThere is no deity but Allah — glory be to Allah, how forbearing is Allah!\nThere is no deity but Allah — glory be to Allah, how generous is Allah!\nThere is no deity but Allah — glory be to Allah, how merciful is Allah!",
    footnote:
      "The Prophet ﷺ exhorted sending blessings upon him frequently. Whoever does so, Allah's blessings descend upon him tenfold. (Muslim)",
  },
  {
    pageNumber: 30,
    arabic:
      "مُحَمَّدٍ كُلَّمَا ذَكَرَهُ الذَّاكِرُونَ وَصَلِّ عَلَى مُحَمَّدٍ كُلَّمَا غَفَلَ عَن ذِكرِهِ الغَافِلُونَ\nرَضِينَا بِاللهِ تَعَالَى رَبًّا وَّبِالإِسلَامِ دِينًا وَّبِمُحَمَّدٍ صَلَّى اللهُ عَلَيهِ وَسَلَّمَ نَبِيًّا وَرَسُولًا",
    urduTranslation:
      "محمد ﷺ پر جب بھی ذکر کرنے والے ذکر کریں اور درود کامل ہو۔ درود نازل فرما محمد ﷺ پر جب بھی غافل رہیں ان کی یاد سے غافل رہنے والے۔ ہم راضی ہیں اللہ تعالٰی سے بطور رب اور اسلام سے بطور دین اور محمد ﷺ سے بطور نبی اور رسول۔",
    englishTranslation:
      "…upon Muhammad ﷺ whenever those who remember mention him, and send blessings upon Muhammad ﷺ whenever the heedless are heedless of his remembrance.\nWe are pleased with Allah as our Lord, with Islam as our religion, and with Muhammad ﷺ as our Prophet and Messenger.",
  },
  {
    pageNumber: 31,
    arabic:
      "أَئِمَّةً ۞ رِضوَانُ اللهِ تَعَالَى عَلَيهِمُ أَجمَعِينَ ۞\nمَرحَبًا بِالصَّبَاحِ الجَدِيدِ وَبِاليَومِ السَّعِيدِ وَبِالمَلَكَينِ الكَاتِبَينِ الشَّاهِدَينِ النَّعَادِلَينِ حَيَّاكُمَا اللهُ تَعَالَى وَبَيَّاكُمَا",
    urduTranslation:
      "پیشواؤں سے اور ان پر اللہ تعالٰی سے راضی رہے ان سب لوگوں پر۔ مبارک ہو نئی صبح اور مبارک ہو خوشی والا دن اور مرحبا ہو دونوں فرشتوں (جو نیکی اور بدی) لکھتے ہیں اور دونوں گواہ ہیں جو انصاف کرتے ہیں، اللہ تعالٰی تمہیں زندہ رکھے اور خوشحال رکھے۔",
    englishTranslation:
      "…as Imams. May the pleasure of Allah be upon them all.\nWelcome to the new morning, and welcome to the blessed day, and welcome to the two recording angels, the just witnesses. May Allah keep you alive and prosperous.",
    footnote:
      "The Prophet ﷺ had two daughters married to Sayyiduna Uthmanؓ, hence his title Dhul-Nurayn (Possessor of Two Lights).",
  },
  {
    pageNumber: 32,
    arabic:
      "إِلَّا اللهُ وَحدَهُ لَا شَرِيكَ لَهُ وَنَشهَدُ أَنَّ مُحَمَّدًا عَبدُهُ وَرَسُولُهُ بِالهُدَى وَدِينِ الحَقِّ لِيُظهِرَهُ عَلَى الدِّينِ كُلِّهِ وَلَو كَرِهَ المُشرِكُونَ\nعَلَى الشَّهَادَةِ نَحيَا وَعَلَيهَا نَمُوتُ وَعَلَيهَا نُبعَثُ إِن شَاءَ اللهُ تَعَالَى\nأَعُوذُ بِكَلِمَاتِ اللهِ التَّامَّاتِ كُلِّهَا مِن شَرِّ مَا خَلَقَ\nبِسمِ اللهِ خَيرِ الأَسمَاءِ",
    urduTranslation:
      "نہیں ہے کوئی معبود مگر اللہ تعالٰی اکیلا اس کا کوئی شریک نہیں ہے۔ اور شہادت دیتے ہیں ہم کہ محمد ﷺ اس کے بندے اور رسول ہیں، ہدایت کے ساتھ اور دین حق کے ساتھ تاکہ غالب کریں اس کو تمام دینوں پر اگرچہ برا لگے مشرکین کو۔ اس شہادت پر ہم زندہ رہیں اور اس شہادت پر ہم مریں اور اس پر ہم اٹھائے جائیں گے ان شاء اللہ۔ پناہ مانگتا ہوں اللہ تعالٰی کے تمام کلمات کے ذریعے شر سے جو بھی اس نے پیدا کیا۔ اللہ کے نام سے جو سب سے اچھا نام ہے۔",
    englishTranslation:
      "…but Allah alone, with no partner. And we testify that Muhammad ﷺ is His servant and Messenger, with guidance and the religion of truth, to make it prevail over all religions, even if the polytheists dislike it.\nUpon this testimony we live, upon it we die, and upon it we shall be raised, if Allah wills.\nI seek refuge in the complete words of Allah from the evil of what He has created.\nIn the name of Allah, the best of all names.",
  },
  {
    pageNumber: 33,
    arabic:
      "بِسمِ اللهِ رَبِّ الأَرضِ وَرَبِّ السَّمَاءِ\nبِسمِ اللهِ الَّذِي لَا يَضُرُّ مَعَ اسمِهِ شَيءٌ فِي الأَرضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ العَلِيمُ ۞\nاللهُ الَّذِي أَحيَانَا بَعدَ مَا أَمَاتَنَا وَإِلَيهِ البَعثُ وَالنُّشُومُ وَأَصبَحنَا وَأَصبَحَ المُلكُ",
    urduTranslation:
      "اللہ کے نام سے جو زمین کا اور آسمانوں کا پروردگار ہے۔ اللہ کے نام سے شروع کرتا ہوں جس کے نام سے کوئی نقصان نہیں پہنچ سکتا کوئی شے زمین اور آسمانوں میں اور وہ سننے والا جاننے والا ہے۔ اللہ وہ ذات ہے جس نے ہمیں زندہ کیا ہمارے مرنے کے بعد اور اسی کی طرف ہم دوبارہ اٹھ کر جانا ہے۔ اور ہم نے صبح کی ہے اور تمام ملک کا۔",
    englishTranslation:
      "In the name of Allah, Lord of the earth and Lord of the heavens.\nIn the name of Allah — with whose name nothing on earth or in the heavens can cause harm — and He is the All-Hearing, the All-Knowing.\nAllah is the One who gave us life after He caused us to die, and to Him is the resurrection. And we have reached the morning, and all dominion…",
    footnote:
      "It is related that the Prophet ﷺ would recite this supplication upon waking. 'Dying' here refers to sleep, and 'life' to waking. In the evening recite: 'We have reached the evening and all dominion belongs to Allah.'",
  },
  {
    pageNumber: 34,
    arabic:
      "لِلهِ وَالعِزَّةُ وَالعَظَمَةُ وَالكِبرِيَاءُ وَالجَبَرُوتُ وَالسُّلطَانُ وَالبُرهَانُ لِلهِ وَالآلَاءُ وَالنَّعمَاءُ لِلهِ وَالليلُ وَالنَّهَارُ لِلهِ وَمَا سَكَنَ فِيهِمَا لِلهِ الوَاحِدِ\nأَصبَحنَا عَلَى فِطرَةِ الإِسلَامِ كَلِمَةِ الإِخلَاصِ وَعَلَى دِينِ نَبِيِّنَا مُحَمَّدٍ صَلَّى اللهُ عَلَيهِ",
    urduTranslation:
      "اللہ کے لیے ہیں اور عزت اور عظمت اور بڑائی اور بزرگی اور بادشاہی اور روشن دلیل اللہ کے ہیں۔ اور تمام نعمتیں ظاہری و باطنی اللہ کی ہیں۔ اللہ تعالٰی کی ہے رات اور دن اللہ کے واسطے اور جو چیزیں ان میں رہتی ہیں اللہ واحد زبردست کے ہیں۔ ہم نے صبح کی ہے دینِ اسلام پر اور کلمہ اخلاص کے ساتھ اور اپنے نبی ﷺ کے دین پر۔",
    englishTranslation:
      "…belongs to Allah. Might, Magnificence, Pride, Power, Sovereignty, and Clear Proof — all belong to Allah. All blessings, visible and hidden, belong to Allah. Night and day and all that dwells within them belong to Allah, the One.\nWe have reached the morning upon the fitrah of Islam, the word of sincerity, and upon the religion of our Prophet Muhammad ﷺ.",
    footnote:
      "After Maghrib also recite: 'We have reached the evening and all dominion belongs to Allah.' (Abu Dawud)",
  },
  {
    pageNumber: 35,
    arabic:
      "مِلَّةِ أَبِينَا إِبرَاهِيمَ حَنِيفًا مُّسلِمًا وَمَا كَانَ مِنَ المُشرِكِينَ\nصَلَوَاتُ اللهِ وَمَلَائِكَتِهِ وَأَنبِيَائِهِ وَرُسُلِهِ وَحَمَلَةِ عَرشِهِ وَجَمِيعِ خَلقِهِ عَلَى سَيِّدِنَا مُحَمَّدٍ وَآلِهِ وَأَصحَابِهِ عَلَيهِ وَعَلَيهِمُ السَّلامُ وَرَحمَةُ اللهِ وَبَرَكَاتُهُ\nالصَّلٰوةُ وَالسَّلامُ عَلَيكَ يَا رَسُولَ اللهِ",
    urduTranslation:
      "اور ملّت ہمارے باپ ابراہیمؑ پر جو یکسو مسلمان تھے اور مشرکین میں سے نہیں تھے۔ رحمتیں اللہ کی اور اس کے فرشتوں کی اور نبیوں کی اور رسولوں کی اور عرش اٹھانے والے فرشتوں کی اور تمام مخلوق کی ہمارے آقا محمد ﷺ پر اور ان کی آل پر اور اصحاب پر، ان پر سلام اور رحمت اللہ کی اور برکتیں۔ درود اور سلام ہو تجھ پر اے اللہ کے رسول۔",
    englishTranslation:
      "…and the religion of our father Ibrahim, who was purely devoted and submissive, and was not of the polytheists.\nThe blessings of Allah and His angels and His prophets and His messengers and the bearers of His Throne and all of His creation be upon our master Muhammad ﷺ and his family and companions — upon him and upon them be peace and the mercy and blessings of Allah.\nPeace and blessings of Allah be upon you, O Messenger of Allah.",
    footnote:
      "According to authentic narrations, Shah Hamadanؒ sent seventy salams upon the Prophet ﷺ in his seventeen treatises. Sending salutations upon the Prophet ﷺ brings blessings from Allah tenfold.",
  },
  {
    pageNumber: 36,
    arabic:
      "وَالسَّلامُ عَلَيكَ يَا حَبِيبَ اللهِ الصَّلٰوةُ وَالسَّلامُ عَلَيكَ يَا خَلِيلَ اللهِ الصَّلٰوةُ وَالسَّلامُ عَلَيكَ يَا نَبِيَّ اللهِ الصَّلٰوةُ وَالسَّلامُ عَلَيكَ يَا صَفِيَّ اللهِ وَالسَّلامُ عَلَيكَ يَا خَيرَ خَلقِ اللهِ الصَّلٰوةُ وَالسَّلامُ عَلَيكَ يَا مَنِ اختَارَهُ اللهُ الصَّلٰوةُ وَالسَّلامُ عَلَيكَ يَا مَن أَرسَلَهُ اللهُ الصَّلٰوةُ وَالسَّلامُ عَلَيكَ",
    urduTranslation:
      "اور سلام ہو آپ ﷺ پر، اے اللہ کے محبوب۔ درود اور سلام ہو آپ ﷺ پر، اے اللہ کے دوست۔ درود اور سلام ہو آپ ﷺ پر، اے اللہ کے نبی۔ درود اور سلام ہو آپ ﷺ پر، اے اللہ کے برگزیدہ۔ اور سلام ہو آپ ﷺ پر، اے اللہ کی سب سے بہترین مخلوق۔ درود اور سلام ہو اس ہستی پر جس کو اللہ تعالٰی نے برگزیدہ کیا۔ درود اور سلام ہو اس ہستی پر جسے اللہ تعالٰی نے بھیجا۔ درود اور سلام ہو آپ ﷺ پر۔",
    englishTranslation:
      "Peace be upon you, O Beloved of Allah. Blessings and peace upon you, O Intimate Friend of Allah. Blessings and peace upon you, O Prophet of Allah. Blessings and peace upon you, O Chosen One of Allah. And peace be upon you, O Best of Allah's creation. Blessings and peace upon the one whom Allah chose. Blessings and peace upon the one whom Allah sent. Blessings and peace be upon you.",
  },
  {
    pageNumber: 37,
    arabic:
      "يَا مَن زَيَّنَهُ اللهُ الصَّلٰوةُ وَالسَّلامُ عَلَيكَ يَا مَن شَرَّفَهُ اللهُ الصَّلٰوةُ وَالسَّلامُ عَلَيكَ يَا مَن كَرَّمَهُ اللهُ الصَّلٰوةُ وَالسَّلامُ عَلَيكَ يَا مَن عَظَّمَهُ اللهُ الصَّلٰوةُ وَالسَّلامُ عَلَيكَ يَا سَيِّدَ المُرسَلِينَ الصَّلٰوةُ وَالسَّلامُ عَلَيكَ يَا إِمَامَ المُتَّقِينَ وَالسَّلامُ عَلَيكَ يَا خَاتَمَ النَّبِيِّينَ",
    urduTranslation:
      "اے وہ ہستی جس کو اللہ تعالٰی نے سنوارا، رحمت اور سلام ہو۔ آپ ﷺ پر، اے وہ ہستی جس کو اللہ تعالٰی نے شرف بخشا، رحمت اور سلام ہو۔ اور سلام ہو آپ ﷺ پر اے وہ جس پر اللہ تعالٰی نے کرم کیا۔ رحمت اور سلام ہو آپ ﷺ پر اے وہ جس کو اللہ تعالٰی نے عزت دی۔ رحمت اور سلام ہو آپ ﷺ پر، اے سردار پیمبروں کے۔ رحمت اور سلام ہو آپ ﷺ پر، اے پیشوا متقیوں کے۔ اور سلام ہو آپ ﷺ پر اے خاتم النبیین۔",
    englishTranslation:
      "O the one whom Allah adorned — blessings and peace. O the one whom Allah honoured — blessings and peace. O the one whom Allah ennobled — blessings and peace upon you. O the one whom Allah exalted — blessings and peace upon you. O Master of all Messengers — blessings and peace. O Imam of the God-fearing — blessings and peace. And peace be upon you, O Seal of all Prophets.",
  },
  {
    pageNumber: 38,
    arabic:
      "الصَّلٰوةُ وَالسَّلامُ عَلَيكَ يَا شَفِيعَ المُذنِبِينَ\nالصَّلٰوةُ وَالسَّلامُ عَلَيكَ يَا رَسُولَ رَبِّ العَالَمِينَ\nصَلَوَاتُ اللهِ وَمَلَائِكَتِهِ وَأَنبِيَائِهِ وَرُسُلِهِ وَحَمَلَةِ عَرشِهِ وَجَمِيعِ خَلقِهِ عَلَى سَيِّدِنَا مُحَمَّدٍ وَآلِهِ وَأَصحَابِهِ عَلَيهِ وَعَلَيهِمُ السَّلامُ وَرَحمَةُ اللهِ وَبَرَكَاتُهُ\nاللّهُمَّ صَلِّ عَلَى",
    urduTranslation:
      "رحمت اور سلام ہو آپ ﷺ پر اے گناہگاروں کے لیے سفارش کرنے والے۔ رحمت اور سلام ہو آپ ﷺ پر اے رسول پروردگار عالمین کے۔ رحمتیں اللہ کی اور فرشتوں کی اور نبیوں کی اور رسولوں کی اور عرش اٹھانے والے فرشتوں کی اور تمام مخلوق کی ہمارے آقا محمد ﷺ پر اور ان کی آل پر اور اصحاب پر، ان پر سلام ہو اور رحمت اللہ کی اور برکتیں۔ اے اللہ! درود نازل فرما۔",
    englishTranslation:
      "Blessings and peace be upon you, O Intercessor for the sinners.\nBlessings and peace be upon you, O Messenger of the Lord of all worlds.\nThe blessings of Allah and His angels and His prophets and His messengers and the bearers of His Throne and all His creation be upon our master Muhammad ﷺ, his family and companions — upon him and upon them be peace and the mercy and blessings of Allah.\nO Allah, send blessings upon…",
    footnote:
      "Seal of the Prophets means the last prophet, as a seal is placed at the end. After him ﷺ, there is no prophet. He said: 'I am the Seal of the Prophets, there is no prophet after me.' (Abu Dawud)",
  },
  {
    pageNumber: 39,
    arabic:
      "سَيِّدِنَا مُحَمَّدٍ فِي الأَوَّلِينَ وَصَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ فِي الآخِرِينَ وَصَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ فِي المَلَاءِ الأَعلَى إِلَى يَومِ الدِّينِ وَصَلِّ عَلَى مُحَمَّدٍ فِي كُلِّ وَقتٍ وَحِينٍ وَصَلِّ عَلَى جَمِيعِ الأَنبِيَاءِ وَالمُرسَلِينَ وَعَلَى مَلَائِكَتِكَ المُقَرَّبِينَ وَعَلَى عِبَادِكَ الصَّالِحِينَ وَعَلَى أَهلِ",
    urduTranslation:
      "ہمارے سردار حضرت محمد ﷺ پر اگلوں کے درمیان اور درود ہو۔ ہمارے سردار محمد ﷺ پر پچھلوں کے درمیان۔ ہمارے آقا حضرت محمد ﷺ پر ملاء اعلیٰ میں یوم قیامت تک۔ حضرت محمد ﷺ پر ہر وقت اور ہر زمانہ میں۔ تمام انبیاء اور پیمبروں پر۔ اور تمام فرشتوں مقربین پر۔ اور تیرے صالح بندوں پر اور اہل۔",
    englishTranslation:
      "…our master Muhammad ﷺ among the ancients, and upon our master Muhammad ﷺ among those who come later, and upon our master Muhammad ﷺ in the highest assembly until the Day of Judgement, and upon Muhammad ﷺ at every time and moment. And upon all the Prophets and Messengers, and upon Your closest angels, and upon Your righteous servants, and upon the people of…",
  },
  {
    pageNumber: 40,
    arabic:
      "طَاعَتِكَ أَجمَعِينَ وَارحَمنَا مَعَهُم بِرَحمَتِكَ يَا أَرحَمَ الرَّاحِمِينَ ۞\nتَمَّتَ بِالخَيرِ",
    urduTranslation:
      "تمام فرماں برداروں پر اور رحم فرما ان کے ساتھ ہمیں بھی تیری رحمت سے، اے سب سے زیادہ رحم کرنے والے۔\nختم بالخیر",
    englishTranslation:
      "…Your obedient servants all together, and have mercy upon us along with them through Your mercy, O Most Merciful of the merciful.\nCompleted with goodness.",
  },
];

/* ══════════════════════════════════════════════════════════════════
   SECTION 2 — DUA-E-RAQAB (Pages 44–53)
   ══════════════════════════════════════════════════════════════════ */
const DUA_RAQAB_PAGES: AuradFathiyaPage[] = [
  {
    pageNumber: 1,
    arabic:
      "بِسمِ اللهِ الرَّحمٰنِ الرَّحِيمِ ۞\nاللّهُمَّ يَا مَالِكَ الرِّقَابِ وَيَا مُفَتِّحَ الأَبوَابِ وَيَا مُسَبِّبَ الأَسبَابِ\nهَيِّئَ لَنَا سَبَبًا لَّا نَستَطِيعُ لَهُ طَلَبًا اللّهُمَّ",
    urduTranslation:
      "اللہ کے نام سے شروع کرتاہوں جو بہت ہی مہربان بہت رحم فرمانے والا ہے۔\nاے الٰہی! اے گردنوں کے (یعنی جسم و جان کے) مالک اور اے دروازوں (رحمت) کے کھولنے والے اور اے اسباب کے مہیا کرنے والے، ہمارے لیے مہیا فرما وہ سبب جسے ہم حاصل نہیں کر سکتے، الٰہی!",
    englishTranslation:
      "In the name of Allah, the Most Gracious, the Most Merciful.\nO Allah, O Master of all necks (souls), O Opener of all doors, O Originator of all causes — provide for us a means that we are unable to seek ourselves. O Allah…",
  },
  {
    pageNumber: 2,
    arabic:
      "اجعَلنَا مَشغُولِينَ بِأَمرِكَ اَمِنِينَ بِعَدلِكَ الأَنسِيينَ مِن خَلقِكَ الآنسِينَ بِكَ مُستَوحِشِينَ عَن غَيرِكَ رَاضِينَ بِقَضَائِكَ صَابِرِينَ عَلَى بَلَائِكَ قَانِعِينَ لِعَطَائِكَ شَاكِرِينَ لِنَعمَائِكَ مُتَلَذِّذِينَ بِذِكرِكَ فَرِحِينَ بِكِتَابِكَ مُنَاجِينَ بِكَ فِي آنَاءِ اللَّيلِ وَأَطرَافِ النَّهَارِ مُبغِضِينَ لِلدُّنيَا وَمُحِبِّينَ لِلآخِرَةِ",
    urduTranslation:
      "ہم کو دے شغل کام میں تیرے، تیری عدل کی وجہ سے مامون اور محفوظ ہوں تیری مخلوق سے بے نیاز اور تیرے ساتھ مانوس اور تیرے غیروں سے دل نہ لگائیں، تیری قضاء پر راضی رہیں، تیری آزمائشوں پر صابر رہیں، تیری بخششوں پر قانع رہیں اور شاکر رہیں تیری نعمتوں سے لذت لینے والے ہوں، تیری کتاب سے خوش ہوں اور رات کے گوشوں میں یاد کرتے رہیں۔ دنیا سے نفرت کریں اور آخرت سے محبت کریں۔",
    englishTranslation:
      "Make us occupied with Your command, secure in Your justice, unconcerned with Your creation, intimate with You, and alienated from all besides You. Make us content with Your decree, patient in Your trials, satisfied with Your gifts, grateful for Your blessings, finding joy in Your remembrance, rejoicing in Your Book, conversing with You in the depths of night and edges of day, averse to this world and lovers of the Hereafter.",
  },
  {
    pageNumber: 3,
    arabic:
      "مُشتَاقِينَ إِلَى لِقَائِكَ مُتَوَجِّهِينَ إِلَى جَنَابِكَ مُستَعِدِّينَ لِلمَوتِ\nرَبَّنَا وَاتِنَا مَا وَعَدتَّنَا عَلَى رُسُلِكَ وَلَا تُخزِنَا يَومَ القِيَامَةِ إِنَّكَ لَا تُخلِفُ المِيعَادَ\nاللّهُمَّ اجعَلِ التَّوفِيقَ رَفِيقَنَا وَالصِّرَاطَ المُستَقِيمَ طَرِيقَنَا\nاللّهُمَّ أَوصِلنَا إِلَى مَقَاصِدِنَا وَتُب عَلَينَا إِنَّكَ أَنتَ التَّوَّابُ الرَّحِيمُ",
    urduTranslation:
      "تیرے وصال اور ملاقات کے آرزو مند رہیں تیری بارگاہ کی طرف متوجّہ رہیں اور موت کے لیے تیار رہیں۔ اے رب! ہمیں عطا فرما وہ جو تو نے اپنے رسولوں کے ذریعہ وعدہ کیا ہے۔ اور نہ رسواکرنا ہم کو قیامت کے دن، بے شک تو خلف وعدہ نہیں کرتا۔ اے الٰہی! بنا دے توفیق کو ہمارا رفیق اور صراط مستقیم ہمارا راستہ۔ اے الٰہی! ہم کو ہمارے مقاصد میں کامیاب فرما اور قبول فرما توبہ ہماری، بے شک تو ہی ہے توبہ قبول کرنے والا اور رحم کرنے والا۔",
    englishTranslation:
      "…yearning to meet You, turning toward Your presence, and prepared for death.\nOur Lord, grant us what You promised through Your messengers, and do not disgrace us on the Day of Resurrection — indeed, You never break Your promise.\nO Allah, make tawfiq our companion and the Straight Path our road.\nO Allah, lead us to our goals and accept our repentance — indeed, You are the Accepter of Repentance, the Most Merciful.",
  },
  {
    pageNumber: 4,
    arabic:
      "اللّهُمَّ بِكَ أَصبَحنَا وَبِكَ أَمسَينَا وَبِكَ نَحيَا وَبِكَ نَمُوتُ وَإِلَيكَ المَصِيرُ\nاللّهُمَّ أَرِنَا لَذَّةَ النَّظَرِ إِلَى وَجهِكَ وَالشَّوقَ إِلَى لِقَائِكَ\nاللّهُمَّ أَرِنَا الحَقَّ حَقًّا وَارزُقنَا اتِّبَاعَهُ وَأَرِنَا البَاطِلَ بَاطِلًا وَارزُقنَا اجتِنَابَهُ\nاللّهُمَّ أَرِنَا حَقَائِقَ الأَشيَاءِ كَمَا هِيَ تَوَفَّنَا مُسلِمِينَ وَالحِقنَا",
    urduTranslation:
      "اے الٰہی! تیرے نام کے ساتھ ہم نے صبح کی اور تیرے نام کے ساتھ ہم نے شام کی اور تیرے ساتھ ہم زندہ ہیں اور تیرے ساتھ ہم مریں گے اور تیری ہی طرف لوٹنا ہے۔ اے الٰہی! عطا کر ہم کو لذّت نظر (دیدار کا شرف) اور ملاقات کا اشتیاق۔ اے الٰہی! دکھا ہم کو حق کو حق اور توفیق دے اس کی پیروی کرنے کی اور دکھا ہم کو باطل کو باطل اور توفیق دے ہم کو باطل سے بچنے کی۔ اے الٰہی! دکھا ہم کو اشیاء کی حقیقتیں جیسی کہ وہ ہیں۔ پر موت دے اسلام پر اور شامل کر۔",
    englishTranslation:
      "O Allah, by You we reached the morning, by You we reached the evening, by You we live, by You we die, and to You is the return.\nO Allah, show us the pleasure of beholding Your Face and the longing to meet You.\nO Allah, show us truth as truth and bless us to follow it, and show us falsehood as falsehood and bless us to avoid it.\nO Allah, show us the realities of things as they truly are. Cause us to die as Muslims and join us…",
  },
  {
    pageNumber: 5,
    arabic:
      "بِالصَّالِحِينَ\nرَبَّنَا اَتمِم لَنَا نُورَنَا وَاغفِر لَنَا إِنَّكَ عَلَى كُلِّ شَيءٍ قَدِيرٌ\nرَبَّنَا لَا تُؤَاخِذنَا إِن نَّسِينَا أَو أَخطَأنَا\nرَبَّنَا وَلَا تَحمِل عَلَينَا إِصرًا كَمَا حَمَلتَهُ عَلَى الَّذِينَ مِن قَبلِنَا رَبَّنَا وَلَا تُحَمِّلنَا مَا لَا طَاقَةَ لَنَا بِهِ وَاعفُ عَنَّا وَاغفِر لَنَا وَارحَمنَا أَنتَ مَولَانَا فَانصُرنَا عَلَى القَومِ الكَافِرِينَ رَبَّنَا لَا تُزِغ",
    urduTranslation:
      "نیک لوگوں کے ساتھ۔ اے ہمارے رب! ہماری روشنی ہمارے لیے پوری کر اور ہمیں بخش دے بے شک تو ہر چیز پر قادر ہے۔ اے ہمارے رب! ہمیں نہ پکڑ اگر ہم نے بھولا ہو یا غلطی کی ہو۔ اے ہمارے رب! اور نہ لاد ہم پر وہ بوجھ جیسا تو نے لادا تھا ان لوگوں پر جو ہم سے پہلے تھے۔ اے ہمارے رب! اور نہ اٹھوا ہم سے وہ بوجھ جس کی ہم میں طاقت نہ ہو اور معاف کر ہمیں اور بخش ہمیں اور رحم کر ہم پر تو ہمارا مولا ہے تو ہمیں فتح دے کافروں کی قوم پر۔ اے ہمارے رب! نہ پھیر۔",
    englishTranslation:
      "…with the righteous.\nOur Lord, complete our light for us and forgive us — indeed, You have power over all things. (Quran 66:8)\nOur Lord, do not take us to task if we forget or err. Our Lord, lay not upon us a burden like that which You placed upon those before us. Our Lord, burden us not with what we have no strength to bear. Pardon us, forgive us, and have mercy on us. You are our Protector, so give us victory over the disbelieving people. (Quran 2:286) Our Lord, do not let…",
  },
  {
    pageNumber: 6,
    arabic:
      "قُلُوبَنَا بَعدَ إِذ هَدَيتَنَا وَهَب لَنَا مِن لَّدُنكَ رَحمَةً إِنَّكَ أَنتَ الوَهَّابُ\nرَبَّنَا إِنَّكَ جَامِعُ النَّاسِ لِيَومٍ لَّا رَيبَ فِيهِ إِنَّ اللهَ لَا يُخلِفُ المِيعَادَ\nرَبَّنَا إِنَّنَا آمَنَّا فَاغفِر لَنَا ذُنُوبَنَا وَقِنَا عَذَابَ النَّارِ\nرَبَّنَا لَا تَجعَلنَا مَعَ القَومِ الظَّالِمِينَ\nرَبَّنَا أَفرِغ عَلَينَا صَبرًا وَّثَبِّت أَقدَامَنَا وَانصُرنَا",
    urduTranslation:
      "ہمارے دلوں کو ہدایت دینے کے بعد اور عطا کر ہمیں اپنی طرف سے رحمت، بے شک تو ہی عطا کرنے والا ہے۔ اے ہمارے رب! بے شک تو سب لوگوں کو جمع کرنے والا ہے ایک ایسے دن جس میں کوئی شک نہیں۔ بے شک اللہ تعالٰی وعدہ خلافی نہیں کرتا۔ اے ہمارے رب! بے شک ہم ایمان لائے پس بخش دے ہمارے گناہوں کو اور بچا ہمیں آگ کے عذاب سے۔ اے ہمارے رب! نہ شامل کر ہمیں ظالموں کی قوم کے ساتھ۔ اے ہمارے رب! ڈال ہم پر صبر اور ثابت رکھ ہمارے قدم اور فتح عطا فرما ہمیں۔",
    englishTranslation:
      "…our hearts swerve after You have guided us, and grant us from Yourself mercy — indeed, You are the Bestower. (Quran 3:8)\nOur Lord, You will surely gather the people for a Day about which there is no doubt. Indeed, Allah does not fail in His promise. (Quran 3:9)\nOur Lord, we have believed, so forgive us our sins and protect us from the punishment of the Fire. (Quran 3:16)\nOur Lord, do not place us with the wrongdoing people. (Quran 7:47)\nOur Lord, pour upon us patience, plant our feet firmly, and grant us victory…",
  },
  {
    pageNumber: 7,
    arabic:
      "عَلَى القَومِ الكَافِرِينَ\nرَبَّنَا آتِنَا مِنَ الدُّنيَا حَسَنَةً وَّفِي الآخِرَةِ حَسَنَةً وَّقِنَا عَذَابَ النَّارِ\nرَبَّنَا اغفِر لَنَا وَلِإِخوَانِنَا الَّذِينَ سَبَقُونَا بِالإِيمَانِ وَلَا تَجعَل فِي قُلُوبِنَا غِلًّا لِّلَّذِينَ آمَنُوا رَبَّنَا إِنَّكَ رَءُوفٌ رَّحِيمٌ\nرَبَّنَا اغفِر لَنَا ذُنُوبَنَا وَإِسرَافَنَا فِي أَمرِنَا وَثَبِّت أَقدَامَنَا وَانصُرنَا عَلَى القَومِ",
    urduTranslation:
      "کافر قوم پر۔ اے ہمارے رب! ہمیں دنیا میں بھلائی دے اور آخرت میں بھلائی اور بچا ہمیں آگ کے عذاب سے۔ اے ہمارے رب! بخش دے ہمیں اور ہمارے ان بھائیوں کو جو ہم سے ایمان میں آگے نکل گئے اور نہ رکھ ہمارے دلوں میں کینہ ان لوگوں کے لیے جو ایمان لائے۔ اے ہمارے رب! بے شک تو مہربان رحم کرنے والا ہے۔ اے ہمارے رب! بخش دے ہمارے گناہوں کو اور ہماری زیادتیوں کو اور ثابت کر قدم ہمارے اور مدد کر ہماری قوم پر۔",
    englishTranslation:
      "…over the disbelieving people. (Quran 2:250)\nOur Lord, give us good in this world and good in the Hereafter and protect us from the punishment of the Fire. (Quran 2:201)\nOur Lord, forgive us and our brothers who preceded us in faith and put not in our hearts any resentment toward those who have believed — our Lord, indeed You are Kind and Merciful. (Quran 59:10)\nOur Lord, forgive us our sins and our transgressions in our affairs, plant our feet firmly, and give us victory over the people…",
  },
  {
    pageNumber: 8,
    arabic:
      "الكَافِرِينَ\nرَبَّنَا لَا تَجعَلنَا فِتنَةً لِّلقَومِ الظَّالِمِينَ وَنَجِّنَا بِرَحمَتِكَ مِنَ القَومِ الكَافِرِينَ\nرَبَّنَا أَنزِل عَلَينَا مَائِدَةً مِّنَ السَّمَاءِ تَكُونُ لَنَا عِيدًا لِّأَوَّلِنَا وَآخِرِنَا وَآيَةً مِّنكَ وَارزُقنَا وَأَنتَ خَيرُ الرَّازِقِينَ\nرَبَّنَا ظَلَمنَا أَنفُسَنَا وَإِن لَّم تَغفِر لَنَا وَتَرحَمنَا لَنَكُونَنَّ مِنَ الخَاسِرِينَ رَبَّنَا اغفِر لِي",
    urduTranslation:
      "کافر قوم پر۔ اے ہمارے رب! نہ بنا ہمیں فتنہ ظالم قوم کے لیے اور نجات دے ہمیں اپنی رحمت سے کافر قوم سے۔ اے ہمارے رب! نازل فرما ہم پر دسترخوان آسمان سے جو ہو جائے ہماری عید اولوں کے لیے اور پچھلوں کے لیے اور ایک نشانی تیری طرف سے اور ہمیں رزق دے اور تو بہترین رزق دینے والوں میں سے ہے۔ اے ہمارے رب! ہم نے اپنے آپ پر ظلم کیا اور اگر تو نے ہمیں معاف نہیں کیا اور ہم پر رحم نہیں کیا تو ہم ضرور نقصان اٹھانے والوں میں سے ہوں گے۔ اے ہمارے رب! بخش دے مجھے۔",
    englishTranslation:
      "…of disbelievers.\nOur Lord, do not make us a trial for the wrongdoing people, and save us by Your mercy from the disbelieving people. (Quran 10:85-86)\nOur Lord, send down to us a table spread from the heavens to be for us a festival for the first of us and the last of us, and a sign from You. And provide for us, for You are the Best of providers. (Quran 5:114)\nOur Lord, we have wronged ourselves, and if You do not forgive us and have mercy upon us, we will surely be among the losers. (Quran 7:23) Our Lord, forgive me…",
  },
  {
    pageNumber: 9,
    arabic:
      "وَلِوَالِدَيَّ وَلِلمُؤمِنِينَ يَومَ يَقُومُ الحِسَابُ\nرَبَّنَا إِنِّي أَسكَنتُ مِن ذُرِّيَّتِي بِوَادٍ غَيرِ ذِي زَرعٍ عِندَ بَيتِكَ المُحَرَّمِ رَبَّنَا لِيُقِيمُوا الصَّلٰوةَ فَاجعَل أَفئِدَةً مِّنَ النَّاسِ تَهوِي إِلَيهِم وَارزُقهُم مِّنَ الثَّمَرَاتِ لَعَلَّهُم يَشكُرُونَ\nرَبَّنَا اغفِر لِي وَلِوَالِدَيَّ وَلِمَن دَخَلَ بَيتِيَ مُؤمِنًا وَلِلمُؤمِنِينَ وَالمُؤمِنَاتِ وَلَا تَزِدِ الظَّالِمِينَ",
    urduTranslation:
      "اور میرے والدین کو اور مؤمنین کو اس دن جب حساب ہوگا۔ اے ہمارے رب! بے شک میں نے آباد کیا ہے اپنی نسل سے ایک حصّہ کو ایک ایسے وادی میں جہاں کھیتی نہیں ہے تیرے محترم گھر کے پاس۔ اے ہمارے رب! تاکہ وہ نماز قائم کریں، پس کر دے لوگوں میں سے بعضوں کے دل انکی طرف مائل اور رزق دے انہیں پھلوں سے تاکہ وہ شکر کریں۔ اے ہمارے رب! بخش دے مجھے اور میرے والدین کو اور اس کو جو میرے گھر میں داخل ہو ایمان لا کر اور مؤمن مردوں اور عورتوں کو اور نہ بڑھا ظالموں کو۔",
    englishTranslation:
      "…and my parents and the believers on the Day when the account is established. (Quran 14:41)\nOur Lord, I have settled some of my descendants in a valley without cultivation near Your Sacred House — our Lord — so that they may establish prayer. So make hearts among the people incline toward them and provide for them from the fruits that they might be grateful. (Quran 14:37)\nOur Lord, forgive me and my parents and whoever enters my house as a believer and the believing men and believing women, and do not increase the wrongdoers…",
  },
  {
    pageNumber: 10,
    arabic:
      "إِلَّا تَبَارًا\nرَبَّنَا هَب لَنَا مِن أَزوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعيُنٍ وَّاجعَلنَا لِلمُتَّقِينَ إِمَامًا\nرَّبَّنَا تَقَبَّل مِنَّا إِنَّكَ أَنتَ السَّمِيعُ العَلِيمُ وَتُب عَلَينَا إِنَّكَ أَنتَ التَّوَّابُ الرَّحِيمُ\nرَبَّنَا آتِنَا مِن لَّدُنكَ رَحمَةً وَهَيِّئ لَنَا مِن أَمرِنَا رَشَدًا\nسُبحَانَ رَبِّكَ رَبِّ العِزَّةِ عَمَّا يَصِفُونَ وَسَلَامٌ عَلَى المُرسَلِينَ\nوَالحَمدُ لِلَّهِ رَبِّ العَالَمِينَ",
    urduTranslation:
      "سوا ہلاکت کے۔ اے ہمارے رب! عطا کر ہمیں ہماری بیویوں سے اور ہماری اولاد سے آنکھوں کی ٹھنڈک اور بنا ہمیں متقیوں کے لیے پیشوا۔ اے ہمارے رب! قبول فرما ہم سے بے شک تو ہی سننے والا جاننے والا ہے اور توبہ قبول فرما ہماری بے شک تو ہی توبہ قبول کرنے والا اور رحم کرنے والا ہے۔ اے ہمارے رب! عطا فرما ہمیں اپنے پاس سے رحمت اور مہیا کر ہمارے کام کے لیے رشد (درست راہ)۔ پاک ہے تیرا رب، رب العزت اس سے جو وہ بیان کرتے ہیں اور سلام ہو رسولوں پر۔ اور تمام تعریفیں اللہ تعالٰی کے لیے ہیں جو تمام جہانوں کا پالنے والا ہے۔",
    englishTranslation:
      "…except in ruin.\nOur Lord, grant us from our spouses and our offspring comfort to our eyes and make us a leader for the righteous. (Quran 25:74)\nOur Lord, accept from us — indeed, You are the All-Hearing, the All-Knowing. And accept our repentance — indeed, You are the Accepter of Repentance, the Most Merciful. (Quran 2:127-128)\nOur Lord, grant us from Yourself mercy and prepare for us from our affair right guidance. (Quran 18:10)\nExalted is your Lord, the Lord of Might, above what they describe. And peace be upon the messengers. And praise be to Allah, Lord of the worlds. (Quran 37:180-182)",
  },
];

/* ══════════════════════════════════════════════════════════════════
   Export
   ══════════════════════════════════════════════════════════════════ */
export const AURAD_FATHIYA_SECTIONS: AuradFathiyaSection[] = [
  {
    id: "main",
    title: "Aurad Fathiya",
    arabicTitle: "الأوراد الفاتحية",
    description:
      "The blessed litany compiled by Shah Hamadan (d. 786 AH) from 1,400 awliya. Recite with presence of heart.",
    pages: MAIN_PAGES,
  },
  {
    id: "dua-raqab",
    title: "Dua-e-Raqab",
    arabicTitle: "دُعَاءَ رَقَب",
    description:
      "The Supplication of the Servant — Quranic duas compiled by Shah Hamadan for every need of this life and the next.",
    pages: DUA_RAQAB_PAGES,
  },
];

export const AURAD_TOTAL_PAGES = MAIN_PAGES.length + DUA_RAQAB_PAGES.length;
