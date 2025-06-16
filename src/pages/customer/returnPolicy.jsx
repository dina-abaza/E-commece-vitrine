import React from "react";

export default function ReturnPolicy() {
  return (
    <div dir="rtl" className="  max-w-4xl mx-auto px-4 py-10 text-right text-black leading-loose">
      <h1 className="text-2xl font-bold mb-6">سياسة الإرجاع والاستبدال لدى فيترين</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">الشروط العامة</h2>
        <ul className="list-disc pr-5 space-y-2">
          <li>جميع المنتجات مؤهلة للإرجاع إذا كان بها عيوب تصنيع تؤثر على وظيفتها، أو تنقص من المواصفات المتفق عليها، أو تحتوي على قطع مكسورة أو مشاكل في الخامات.</li>
          <li>يمكن إرجاع واستبدال المنتجات خلال 14 يومًا من الاستلام.</li>
          <li>للتواصل بخصوص الإرجاع، يمكن الاتصال على رقم 01120210077 أو عبر واتس آب، مع إرسال صور أو فيديو يوضح العيب.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">أسباب الإرجاع</h2>
        <ul className="list-disc pr-5 space-y-2">
          <li>ألوان خاطئة</li>
          <li>أحجام خاطئة</li>
          <li>مواد تصنيع خاطئة</li>
          <li>أبعاد خاطئة</li>
          <li>منتج معيب</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">المنتجات المصنعة بمواصفات خاصة</h2>
        <p>
          المنتجات المصنعة حسب الطلب (مثل الأشكال، الألوان، الأحجام المخصصة) غير مؤهلة للإرجاع إذا تم تغيير رأي العميل.
        </p>
        <p>
          المنتجات الجاهزة يمكن إرجاعها أو استبدالها خلال 14 يومًا من الاستلام بشرط أن تكون في حالتها الأصلية ومكتملة الملحقات.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">رسوم الشحن</h2>
        <ul className="list-disc pr-5 space-y-2">
          <li>في حالة وجود عيب في الصناعة أو اختلاف في المواصفات، يتم استرداد المبلغ بالكامل شامل الشحن.</li>
          <li>إذا لم يكن هناك عيب، يتحمل العميل تكلفة الشحن عند استرجاع المنتج.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">التحقق واسترداد المبلغ</h2>
        <ul className="list-disc pr-5 space-y-2">
          <li>يتم التحقق من صحة جميع طلبات الإرجاع من قبل فريق مختص لتأكيد أهلية الطلب.</li>
          <li>تتم عملية استرداد المبلغ خلال 3 أيام عمل.</li>
          <li>يتم الاسترداد عبر تحويل بنكي أو محفظة إلكترونية أو بطاقة ائتمانية، ولا توفر فيترين استرداد نقدي.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">رفض استلام المنتج</h2>
        <ul className="list-disc pr-5 space-y-2">
          <li>يمكن رفض استلام المنتج في حالة وجود تلف مرئي أو عناصر مفقودة أو عيوب.</li>
          <li>في حالة رفض الاستلام لأسباب خاصة بالعميل، يتحمل العميل تكلفة الشحن التي يحددها فريق الدعم.</li>
        </ul>
      </section>
    </div>
  );
}
