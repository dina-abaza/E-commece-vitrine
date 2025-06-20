import React from 'react';

const About = () => {
  return (
    <div dir="rtl" className="bg-white text-gray-800 px-6 py-12 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">من نحن - Vitrine</h1>
      <p className="mb-4 leading-loose text-right">
        مرحبًا بك في <span className="font-semibold">Vitrine</span>، حيث يتحول منزلك إلى مساحة تنبض بالأناقة والراحة.
        نحن متجر إلكتروني متخصص في <strong>بيع الأثاث وكل ما يتعلق بديكور وتجهيز المنزل</strong>.
        نؤمن أن المنزل ليس مجرد مكان، بل هو انعكاس لذوقك، أسلوبك، وراحتك النفسية.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3 text-right">🎯 رؤيتنا</h2>
      <p className="mb-4 leading-loose text-right">
        أن نكون الخيار الأول في عالم الأثاث والديكور المنزلي عبر الإنترنت في العالم العربي،
        من خلال تقديم تجربة تسوق سهلة، ومجموعة منتجات راقية ترضي مختلف الأذواق.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3 text-right">💼 مهمتنا</h2>
      <ul className="list-disc list-inside text-right space-y-2">
        <li>تقديم تشكيلة واسعة من الأثاث المودرن والكلاسيكي، وقطع الديكور المميزة.</li>
        <li>ضمان جودة عالية وخامات مُختارة بعناية.</li>
        <li>توصيل سريع وآمن إلى باب منزلك.</li>
        <li>توفير خدمة عملاء احترافية تُلبي احتياجاتك.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-3 text-right">🛋️ ماذا نقدم؟</h2>
      <ul className="list-disc list-inside text-right space-y-2">
        <li>غرف نوم ومعيشة بتصاميم جذابة.</li>
        <li>طاولات، كراسي، وخزائن عملية.</li>
        <li>ديكورات منزلية، مرايا، وسجاد.</li>
        <li>إكسسوارات تضيف لمسات نهائية أنيقة.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-3 text-right">❤️ لماذا تختار Vitrine؟</h2>
      <ul className="list-disc list-inside text-right space-y-2">
        <li>تصميمات عصرية تُناسب جميع المساحات.</li>
        <li>أسعار تنافسية وتخفيضات حصرية.</li>
        <li>ضمان واسترجاع سهل على منتجات مختارة.</li>
        <li>تجربة تسوّق مريحة من المنزل.</li>
      </ul>

      <p className="mt-8 text-center font-medium text-gray-600">
        ✨ في Vitrine، منزلك هو أولويتنا. دعنا نساعدك في تحويل كل زاوية إلى مساحة تنبض بالدفء والجمال.
      </p>
    </div>
  );
};

export default About;
