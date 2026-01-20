import React from "react";

export default function PrivacyPolicy() {
  return (
    <div dir="rtl" className="max-w-5xl mx-auto px-4 py-10 text-right text-gray-800 leading-loose">
      <h1 className="text-2xl font-bold text-black mb-6">سياسة الخصوصية</h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-black">المقدمة</h2>
        <p>
          قامت شركة سمارت فيترين للتجارة والإعلان بإنشاء تطبيق يسمى "فيترين فرنتشر"،
          وهو تطبيق تسويقي في مصر يتيح عمليات بيع وشراء الأثاث ومنتجات الديكور.
        </p>
        <p>
          عند استخدامك للتطبيق، فإنك تقر بقبولك لهذه الشروط والأحكام العامة بالكامل.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-black">المادة 1: التسجيل والحساب</h2>
        <p>
          لا يمكنك التسجيل في التطبيق إذا كنت دون سن 18 عامًا. أنت مسؤول عن سرية بياناتك،
          ويحق للشركة تعليق أو إلغاء الحساب في أي وقت دون إشعار مسبق.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-black">المادة 2: شروط وأحكام البيع</h2>
        <ul className="list-disc pr-5 space-y-2">
          <li>التطبيق وسيط بين البائع والمشتري ولا يُعد طرفًا في عملية البيع.</li>
          <li>تُطبق رسوم إضافية مثل الشحن والتوصيل والتأمين.</li>
          <li>يجب إرسال نسخة الفاتورة خلال 3 أيام من استلام المنتج.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-black">المادة 3: الإرجاع والاسترداد</h2>
        <p>
          الإرجاع يتم من خلال البائع مع إشراف من سمارت فيترين وفقًا لسياسات الاسترداد
          والقوانين المحلية.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-black">المادة 4: قواعد المحتوى</h2>
        <p>
          يجب ألا يحتوي المحتوى على أي إساءة أو انتهاك قانوني، ولا يحق لك نشر أو نقل أي
          محتوى غير قانوني أو مسيء.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-black">المادة 5: استخدام التطبيق</h2>
        <p>
          يمنع استخدام التطبيق بشكل يضر بالخدمة أو يهدد أمانها، أو يحتوي على برامج ضارة،
          أو يحاول اختراق النظام.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-black">المادة 6: دور التطبيق كمتجر إلكتروني</h2>
        <p>
          التطبيق ليس مسؤولًا عن جودة المنتجات أو النزاعات الناتجة عن عمليات البيع،
          ويجب الرجوع إلى البائع مباشرة عند الحاجة.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-black">المادة 7: الشروط العامة</h2>
        <p>
          تشكل هذه الوثيقة الاتفاق الكامل بين المستخدم وسمارت فيترين.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-black">المادة 8: المراجعة والتعديل</h2>
        <p>
          للشركة الحق في تعديل هذه السياسة في أي وقت دون إشعار مسبق.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-black">المادة 9: عدم التنازل</h2>
        <p>
          أي تنازل عن بند لا يعني التنازل عن باقي البنود أو أي خرق لاحق.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-black">المادة 10: بيانات الاتصال</h2>
        <p>شركة سمارت فيترين للتجارة والإعلانات</p>
        <p>البريد الإلكتروني: <a href="mailto:customersupport@smart-vitrine.net" className="text-blue-600 underline">customersupport@smart-vitrine.net</a></p>
        <p>واتساب: <a href="https://wa.me/01120210077" className="text-green-600 underline">01120210077</a></p>
      </section>
    </div>
  );
}
