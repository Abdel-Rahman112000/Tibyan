"use client";

import * as React from "react";
import {
  Box,
  Container,
  Typography,
  useTheme,
  Chip,
  Avatar,
  Button,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import VerifiedIcon from "@mui/icons-material/Verified";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { motion, useInView } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";

const teachers = [
  {
    name: "Sheikh mohamed gomaa",
    nameAr: "الشيخ محمد جمعه",
    experience: 12,
    specialization: "Hifz & Tajweed",
    specializationAr: "الحفظ والتجويد",
    rating: 4.9,
    students: 320,
    color: "#047857",
    letter: "أ",
    certifications: ["Al-Azhar", "Ijaazah Hafs"],
  },
  {
    name: "Sheikh Mohamed Ammar",
    nameAr: "الشيخ محمد عمار",
    experience: 8,
    specialization: "Quran for Kids",
    specializationAr: "القرآن للأطفال",
    rating: 5.0,
    students: 210,
    color: "#3b82f6",
    letter: "م",
    certifications: ["Al-Azhar", "Child Education"],
  },
  {
    name: "Sheikh Yusuf Al-Qari",
    nameAr: "الشيخ يوسف عمار",
    experience: 15,
    specialization: "Maqamat & Qira'at",
    specializationAr: "المقامات والقراءات",
    rating: 4.8,
    students: 415,
    color: "#f59e0b",
    letter: "ي",
    certifications: ["Madinah Univ.", "10 Qira'at"],
  },
  {
    name: "Ustadha Fatima Zahra",
    nameAr: "الأستاذة فاطمة الزهراء",
    experience: 10,
    specialization: "Tajweed & Tarteel",
    specializationAr: "التجويد والترتيل",
    rating: 4.9,
    students: 280,
    color: "#8b5cf6",
    letter: "ف",
    certifications: ["Al-Azhar", "Ijaazah Warsh"],
  },
];

export default function Teachers() {
  const t = useTranslations("teachers");
  const theme = useTheme();
  const locale = useLocale();
  const isRtl = locale === "ar";
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <Box
      id="teachers"
      ref={ref}
      sx={{
        py: { xs: 10, md: 14 },
        background:
          theme.palette.mode === "dark"
            ? `linear-gradient(180deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`
            : "linear-gradient(180deg, #fafaf8 0%, #f0fdf4 100%)",
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
                maxWidth: 560,
                mx: "auto",
                fontSize: "1.05rem",
                lineHeight: 1.7,
              }}
            >
              {t("subtitle")}
            </Typography>
          </motion.div>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              lg: "repeat(4, 1fr)",
            },
            gap: 3,
          }}
        >
          {teachers.map((teacher, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
            >
              <Box
                sx={{
                  borderRadius: "20px",
                  overflow: "hidden",
                  background: theme.palette.background.paper,
                  border: `1px solid ${theme.palette.divider}`,
                  boxShadow: theme.shadows[1],
                  transition: "transform 0.3s ease, box-shadow 0.35s ease",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: `0 20px 50px ${teacher.color}25`,
                    borderColor: `${teacher.color}40`,
                  },
                  cursor: "default",
                }}
              >
                {/* Top color band + avatar */}
                <Box
                  sx={{
                    height: 80,
                    background: `linear-gradient(135deg, ${teacher.color}dd, ${teacher.color}88)`,
                    position: "relative",
                  }}
                />
                <Box sx={{ px: 3, pb: 3, mt: -4 }}>
                  <Avatar
                    sx={{
                      width: 72,
                      height: 72,
                      bgcolor: teacher.color,
                      fontSize: "1.8rem",
                      fontWeight: 700,
                      color: "#fff",
                      border: `4px solid ${theme.palette.background.paper}`,
                      mb: 1.5,
                      boxShadow: `0 4px 16px ${teacher.color}40`,
                    }}
                  >
                    {teacher.letter}
                  </Avatar>

                  <Typography
                    variant="subtitle1"
                    fontWeight={700}
                    sx={{ lineHeight: 1.3, mb: 0.3 }}
                  >
                    {isRtl ? teacher.nameAr : teacher.name}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                      mb: 1,
                    }}
                  >
                    <VerifiedIcon sx={{ fontSize: 14, color: teacher.color }} />
                    <Typography
                      variant="caption"
                      sx={{ color: teacher.color, fontWeight: 600 }}
                    >
                      {isRtl
                        ? teacher.specializationAr
                        : teacher.specialization}
                    </Typography>
                  </Box>

                  {/* Rating */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                      mb: 2,
                    }}
                  >
                    <Box sx={{ display: "flex", gap: 0.1 }}>
                      {[...Array(5)].map((_, si) => (
                        <StarIcon
                          key={si}
                          sx={{
                            fontSize: 13,
                            color:
                              si < Math.floor(teacher.rating)
                                ? theme.palette.secondary.main
                                : theme.palette.divider,
                          }}
                        />
                      ))}
                    </Box>
                    <Typography
                      variant="caption"
                      fontWeight={700}
                      sx={{ color: theme.palette.text.primary }}
                    >
                      {teacher.rating}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: theme.palette.text.secondary }}
                    >
                      · {teacher.students} students
                    </Typography>
                  </Box>

                  {/* Stats row */}
                  <Box
                    sx={{
                      display: "flex",
                      gap: 1,
                      mb: 2.5,
                      p: 1.5,
                      borderRadius: "10px",
                      bgcolor:
                        theme.palette.mode === "dark"
                          ? "rgba(255,255,255,0.04)"
                          : "rgba(0,0,0,0.03)",
                    }}
                  >
                    <Box sx={{ flex: 1, textAlign: "center" }}>
                      <Typography
                        variant="subtitle2"
                        fontWeight={800}
                        sx={{ color: teacher.color }}
                      >
                        {teacher.experience}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ color: theme.palette.text.secondary }}
                      >
                        {t("experience")}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        width: 1,
                        bgcolor: theme.palette.divider,
                      }}
                    />
                    <Box sx={{ flex: 1, textAlign: "center" }}>
                      <Typography
                        variant="subtitle2"
                        fontWeight={800}
                        sx={{ color: teacher.color }}
                      >
                        {teacher.students}+
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ color: theme.palette.text.secondary }}
                      >
                        Students
                      </Typography>
                    </Box>
                  </Box>

                  {/* Certifications */}
                  <Box
                    sx={{
                      display: "flex",
                      gap: 0.8,
                      flexWrap: "wrap",
                      mb: 2.5,
                    }}
                  >
                    {teacher.certifications.map((cert, ci) => (
                      <Chip
                        key={ci}
                        label={cert}
                        size="small"
                        sx={{
                          bgcolor: `${teacher.color}14`,
                          color: teacher.color,
                          border: `1px solid ${teacher.color}30`,
                          fontWeight: 600,
                          fontSize: "0.68rem",
                          height: 22,
                        }}
                      />
                    ))}
                  </Box>

                  <Button
                    variant="outlined"
                    fullWidth
                    endIcon={
                      <ArrowForwardIcon
                        sx={{
                          fontSize: "16px !important",
                          transform: isRtl ? "rotate(180deg)" : "none",
                        }}
                      />
                    }
                    size="small"
                    sx={{
                      borderColor: teacher.color,
                      color: teacher.color,
                      "&:hover": {
                        borderColor: teacher.color,
                        bgcolor: `${teacher.color}10`,
                      },
                      borderRadius: "8px",
                    }}
                  >
                    {t("viewProfile")}
                  </Button>
                </Box>
              </Box>
            </motion.div>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
