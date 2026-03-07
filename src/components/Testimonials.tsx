"use client";

import * as React from "react";
import {
  Box,
  Container,
  Typography,
  useTheme,
  Chip,
  Avatar,
  IconButton,
} from "@mui/material";
import type { Theme } from "@mui/material/styles";
import StarIcon from "@mui/icons-material/Star";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";

const testimonials = [
  {
    name: "Sarah Thompson",
    nameAr: "سارة طومسون",
    country: "United Kingdom",
    flag: "🇬🇧",
    review:
      "My daughter has memorized 3 Juz in just 6 months! The teacher is incredibly patient and the platform is so easy to use. We are beyond grateful for Tibyan.",
    reviewAr:
      "حفظت ابنتي 3 أجزاء في 6 أشهر فقط! المعلم صبور بشكل لا يصدق والمنصة سهلة الاستخدام. نحن ممتنون جداً لتبيان.",
    rating: 5,
    role: "Parent of student, age 9",
    roleAr: "والدة طالبة، عمرها 9 سنوات",
    color: "#047857",
    letter: "S",
  },
  {
    name: "Ahmed Al-Rashidi",
    nameAr: "أحمد الراشدي",
    country: "Saudi Arabia",
    flag: "🇸🇦",
    review:
      "I always struggled with Tajweed rules but Sheikh Ahmad made everything crystal clear. Within 3 months my recitation improved dramatically. Highly recommend!",
    reviewAr:
      "كنت دائماً أعاني مع أحكام التجويد لكن الشيخ أحمد جعل كل شيء واضحاً. في 3 أشهر تحسنت تلاوتي بشكل ملحوظ. أنصح به بشدة!",
    rating: 5,
    role: "Adult student",
    roleAr: "طالب بالغ",
    color: "#3b82f6",
    letter: "أ",
  },
  {
    name: "Khadijah Williams",
    nameAr: "خديجة وليامز",
    country: "United States",
    flag: "🇺🇸",
    review:
      "As a new Muslim, I was nervous about learning Quran online. But Tibyan made the experience welcoming, structured, and genuinely beautiful. I love every session.",
    reviewAr:
      "كمسلمة جديدة، كنت قلقة من تعلم القرآن أونلاين. لكن تبيان جعلت التجربة ترحيبية ومنظمة وجميلة حقاً. أحب كل جلسة.",
    rating: 5,
    role: "New Muslim student",
    roleAr: "طالبة مسلمة جديدة",
    color: "#f59e0b",
    letter: "K",
  },
  {
    name: "Omar Benali",
    nameAr: "عمر بن علي",
    country: "France",
    flag: "🇫🇷",
    review:
      "The flexible scheduling is a game changer for our busy family. My son attends classes from Paris and his teacher is in Egypt — the quality is outstanding.",
    reviewAr:
      "الجدول المرن غيّر كل شيء لعائلتنا المشغولة. ابني يحضر الدروس من باريس ومعلمه في مصر — الجودة استثنائية.",
    rating: 5,
    role: "Parent of student, age 12",
    roleAr: "والد طالب، عمره 12 سنة",
    color: "#8b5cf6",
    letter: "O",
  },
  {
    name: "Noor Al-Hassan",
    nameAr: "نور الحسن",
    country: "Canada",
    flag: "🇨🇦",
    review:
      "I completed my Hifz after 2 years with Tibyan. The structured curriculum and consistent teacher made all the difference. This is the best investment I have ever made.",
    reviewAr:
      "أتممت حفظي بعد سنتين مع تبيان. المنهج المنظم والمعلم الثابت صنعا الفارق. هذا أفضل استثمار قمت به في حياتي.",
    rating: 5,
    role: "Hifz graduate",
    roleAr: "خريج حفظ",
    color: "#ec4899",
    letter: "N",
  },
];

export default function Testimonials() {
  const t = useTranslations("testimonials");
  const theme = useTheme();
  const locale = useLocale();
  const isRtl = locale === "ar";
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [current, setCurrent] = React.useState(0);
  const [direction, setDirection] = React.useState(0);

  const total = testimonials.length;

  const prev = () => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + total) % total);
  };

  const next = () => {
    setDirection(1);
    setCurrent((c) => (c + 1) % total);
  };

  // Auto-advance
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % total);
    }, 6000);
    return () => clearInterval(timer);
  }, [total]);

  const getVisible = () => {
    const indices = [];
    for (let i = 0; i < 3; i++) {
      indices.push((current + i) % total);
    }
    return indices;
  };

  const visibleIndices = getVisible();

  return (
    <Box
      id="testimonials"
      ref={ref}
      sx={{
        py: { xs: 10, md: 14 },
        background:
          theme.palette.mode === "dark"
            ? `linear-gradient(180deg, ${theme.palette.background.default} 0%, ${theme.palette.background.paper} 100%)`
            : "linear-gradient(180deg, #f0fdf4 0%, #fafaf8 100%)",
        overflow: "hidden",
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <Chip
              label={t("badge")}
              sx={{
                mb: 2,
                bgcolor:
                  theme.palette.mode === "dark"
                    ? "rgba(4,120,87,0.15)"
                    : "rgba(4,120,87,0.08)",
                color: theme.palette.primary.main,
                border: `1px solid ${theme.palette.primary.main}30`,
                fontWeight: 600,
              }}
            />
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                mb: 2,
                fontSize: { xs: "1.9rem", md: "2.5rem" },
              }}
            >
              {t("title")}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: theme.palette.text.secondary,
                maxWidth: 520,
                mx: "auto",
                fontSize: "1.05rem",
                lineHeight: 1.7,
              }}
            >
              {t("subtitle")}
            </Typography>
          </motion.div>
        </Box>

        {/* Desktop: 3-up cards */}
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 3,
              mb: 4,
            }}
          >
            {visibleIndices.map((idx, pos) => {
              const item = testimonials[idx];
              return (
                <motion.div
                  key={`${idx}-${current}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: pos * 0.08 }}
                >
                  <TestimonialCard
                    item={item}
                    isRtl={isRtl}
                    theme={theme}
                    featured={pos === 1}
                  />
                </motion.div>
              );
            })}
          </Box>
        </Box>

        {/* Mobile: single card */}
        <Box sx={{ display: { xs: "block", md: "none" }, mb: 4 }}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              initial={{ opacity: 0, x: direction * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -60 }}
              transition={{ duration: 0.35 }}
            >
              <TestimonialCard
                item={testimonials[current]}
                isRtl={isRtl}
                theme={theme}
                featured
              />
            </motion.div>
          </AnimatePresence>
        </Box>

        {/* Controls */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
          }}
        >
          <IconButton
            onClick={isRtl ? next : prev}
            sx={{
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: "10px",
              "&:hover": {
                borderColor: theme.palette.primary.main,
                color: theme.palette.primary.main,
              },
            }}
          >
            <ChevronLeftIcon />
          </IconButton>

          {/* Dots */}
          <Box sx={{ display: "flex", gap: 1 }}>
            {testimonials.map((_, i) => (
              <Box
                key={i}
                onClick={() => {
                  setDirection(i > current ? 1 : -1);
                  setCurrent(i);
                }}
                sx={{
                  width: i === current ? 24 : 8,
                  height: 8,
                  borderRadius: 4,
                  bgcolor:
                    i === current
                      ? theme.palette.primary.main
                      : theme.palette.divider,
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                }}
              />
            ))}
          </Box>

          <IconButton
            onClick={isRtl ? prev : next}
            sx={{
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: "10px",
              "&:hover": {
                borderColor: theme.palette.primary.main,
                color: theme.palette.primary.main,
              },
            }}
          >
            <ChevronRightIcon />
          </IconButton>
        </Box>
      </Container>
    </Box>
  );
}

function TestimonialCard({
  item,
  isRtl,
  theme,
  featured,
}: {
  item: (typeof testimonials)[0];
  isRtl: boolean;
  theme: Theme;
  featured?: boolean;
}) {
  return (
    <Box
      sx={{
        p: { xs: 3, md: 3.5 },
        borderRadius: "20px",
        background: theme.palette.background.paper,
        border: featured
          ? `2px solid ${item.color}40`
          : `1px solid ${theme.palette.divider}`,
        boxShadow: featured ? `0 12px 40px ${item.color}20` : theme.shadows[1],
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: `0 16px 48px ${item.color}25`,
        },
      }}
    >
      {/* Quote icon */}
      <FormatQuoteIcon
        sx={{
          fontSize: 40,
          color: item.color,
          opacity: 0.4,
          mb: 1,
          transform: isRtl ? "scaleX(-1)" : "none",
        }}
      />

      {/* Stars */}
      <Box sx={{ display: "flex", gap: 0.3, mb: 2 }}>
        {[...Array(item.rating)].map((_, i) => (
          <StarIcon
            key={i}
            sx={{ fontSize: 16, color: theme.palette.secondary.main }}
          />
        ))}
      </Box>

      {/* Review */}
      <Typography
        variant="body2"
        sx={{
          color: theme.palette.text.secondary,
          lineHeight: 1.75,
          flex: 1,
          mb: 3,
          fontSize: "0.95rem",
        }}
      >
        &ldquo;{isRtl ? item.reviewAr : item.review}&rdquo;
      </Typography>

      {/* Reviewer */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        <Avatar
          sx={{
            width: 44,
            height: 44,
            bgcolor: item.color,
            fontSize: "1rem",
            fontWeight: 700,
            color: "#fff",
          }}
        >
          {item.letter}
        </Avatar>
        <Box>
          <Typography variant="subtitle2" fontWeight={700}>
            {isRtl ? item.nameAr : item.name}
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: theme.palette.text.secondary }}
          >
            {item.flag} {item.country} · {isRtl ? item.roleAr : item.role}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
