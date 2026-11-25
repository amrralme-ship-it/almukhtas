document.addEventListener("DOMContentLoaded", () => {
    // 1. تحديث السنة تلقائياً في الفوتر
    const yearEl = document.getElementById("currentYear");
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // 2. قائمة الموبايل (Mobile Navigation Toggle)
    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");

    if (menuToggle && mainNav) {
        menuToggle.addEventListener("click", () => {
            const isOpen = mainNav.classList.toggle("open");
            menuToggle.setAttribute("aria-expanded", isOpen);
        });

        // إغلاق القائمة عند الضغط على أي رابط بداخلها
        mainNav.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                mainNav.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
            });
        });
    }

    // 3. الأسئلة الشائعة (FAQ Accordion)
    const faqItems = document.querySelectorAll(".faq-item");
    faqItems.forEach((item) => {
        const questionBtn = item.querySelector(".faq-question");
        const answerBox = item.querySelector(".faq-answer");

        if (questionBtn && answerBox) {
            questionBtn.addEventListener("click", () => {
                const isActive = item.classList.contains("active");

                // إغلاق باقي الأسئلة المفتوحة
                faqItems.forEach((otherItem) => {
                    otherItem.classList.remove("active");
                    const otherBtn = otherItem.querySelector(".faq-question");
                    const otherAnswer = otherItem.querySelector(".faq-answer");
                    if (otherBtn) otherBtn.setAttribute("aria-expanded", "false");
                    if (otherAnswer) otherAnswer.style.maxHeight = null;
                });

                // فتح السؤال الحالي إذا لم يكن مفتوحاً
                if (!isActive) {
                    item.classList.add("active");
                    questionBtn.setAttribute("aria-expanded", "true");
                    answerBox.style.maxHeight = answerBox.scrollHeight + "px";
                }
            });
        }
    });

    // 4. إرسال نموذج الحجز السريع عبر واتساب مباشرة
    const bookingForm = document.getElementById("quickBookingForm");
    if (bookingForm) {
        bookingForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const name = document.getElementById("customerName")?.value.trim() || "";
            const phone = document.getElementById("customerPhone")?.value.trim() || "";
            const device = document.getElementById("deviceType")?.value.trim() || "";
            const area = document.getElementById("customerArea")?.value.trim() || "";
            const issue = document.getElementById("issueDesc")?.value.trim() || "";

            if (!name || !phone || !device || !area) {
                alert("من فضلك أكمل البيانات المطلوبة لإرسال طلب الصيانة.");
                return;
            }

            let message = `مرحباً مركز المختص للصيانة، أريد حجز موعد صيانة:\n`;
            message += `- الاسم: ${name}\n`;
            message += `- رقم الهاتف: ${phone}\n`;
            message += `- الجهاز: ${device}\n`;
            message += `- المنطقة: ${area}`;
            if (issue) {
                message += `\n- وصف العطل: ${issue}`;
            }

            const whatsappNumber = "201064264457";
            const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
            window.open(whatsappURL, "_blank", "noopener");
        });
    }
});