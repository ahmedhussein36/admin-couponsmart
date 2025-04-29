"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

type Language = "en" | "ar"

type LanguageContextType = {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    "settings.title": "Settings",
    "settings.general": "General Settings",
    "settings.homepage": "Home Page Customize",
    "settings.footer": "Footer Customize",
    "settings.about": "About Website",
    "settings.social": "Social Media Links",
    "general.websiteName": "Website Name",
    "general.domain": "Domain",
    "general.favicon": "Favicon",
    "general.save": "Save Changes",
    "homepage.slider": "Slider",
    "homepage.show": "Show",
    "homepage.hide": "Hide",
    "homepage.sliderImages": "Slider Images",
    "homepage.addImage": "Add Image",
    "homepage.imageUrl": "Image URL",
    "homepage.promoBanners": "Promotional Banners",
    "homepage.addBanner": "Add Banner",
    "footer.menus": "Footer Menus",
    "footer.about": "About Menu",
    "footer.pages": "Pages Menu",
    "footer.stores": "Feature Stores Menu",
    "footer.offers": "Seasonal Offers Menu",
    "footer.menuTitle": "Menu Title",
    "footer.menuUrl": "Menu URL",
    "about.content": "About Content",
    "about.faqs": "FAQs",
    "about.metaTitle": "Meta Title",
    "about.metaDescription": "Meta Description",
    "about.openGraph": "Open Graph",
    "social.facebook": "Facebook",
    "social.twitter": "X (Twitter)",
    "social.instagram": "Instagram",
    "social.youtube": "YouTube",
    "social.linkedin": "LinkedIn",
    "social.snapchat": "Snapchat",
    "social.tiktok": "TikTok",
    "common.url": "URL",
    "common.upload": "Upload",
    "common.cancel": "Cancel",
    "common.save": "Save",
  },
  ar: {
    "settings.title": "الإعدادات",
    "settings.general": "الإعدادات العامة",
    "settings.homepage": "تخصيص الصفحة الرئيسية",
    "settings.footer": "تخصيص التذييل",
    "settings.about": "حول الموقع",
    "settings.social": "روابط وسائل التواصل الاجتماعي",
    "general.websiteName": "اسم الموقع",
    "general.domain": "النطاق",
    "general.favicon": "أيقونة الموقع",
    "general.save": "حفظ التغييرات",
    "homepage.slider": "شريط التمرير",
    "homepage.show": "إظهار",
    "homepage.hide": "إخفاء",
    "homepage.sliderImages": "صور شريط التمرير",
    "homepage.addImage": "إضافة صورة",
    "homepage.imageUrl": "رابط الصورة",
    "homepage.promoBanners": "لافتات ترويجية",
    "homepage.addBanner": "إضافة لافتة",
    "footer.menus": "قوائم التذييل",
    "footer.about": "قائمة حول",
    "footer.pages": "قائمة الصفحات",
    "footer.stores": "قائمة المتاجر المميزة",
    "footer.offers": "قائمة العروض الموسمية",
    "footer.menuTitle": "عنوان القائمة",
    "footer.menuUrl": "رابط القائمة",
    "about.content": "محتوى حول",
    "about.faqs": "الأسئلة الشائعة",
    "about.metaTitle": "عنوان الميتا",
    "about.metaDescription": "وصف الميتا",
    "about.openGraph": "Open Graph",
    "social.facebook": "فيسبوك",
    "social.twitter": "إكس (تويتر)",
    "social.instagram": "إنستغرام",
    "social.youtube": "يوتيوب",
    "social.linkedin": "لينكد إن",
    "social.snapchat": "سناب شات",
    "social.tiktok": "تيك توك",
    "common.url": "الرابط",
    "common.upload": "رفع",
    "common.cancel": "إلغاء",
    "common.save": "حفظ",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "ar")) {
      setLanguage(savedLanguage)
    }

    // Set RTL direction for Arabic
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr"
  }, [language])

  const t = (key: string) => {
    return translations[language][key] ?? key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

