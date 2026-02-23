import React, { useRef, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Animated,
  Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

// ── Category data ──────────────────────────────────────
const CATEGORIES = [
  {
    id: 'mowers',
    title: 'Mowers',
    icon: '🚜',
    tagline: 'Find the perfect cut for Bermuda',
    description:
      'Reel mowers, rotary mowers, and robotic options — each suited for different Bermuda varieties and lawn sizes.',
    gradient: ['#43cea2', '#185a9d'],
  },
  {
    id: 'equipment',
    title: 'Lawn Equipment',
    icon: '⚙️',
    tagline: 'Power up your lawn game',
    description:
      'Edgers, aerators, dethatchers, and spreaders to keep your Bermuda turf in championship shape.',
    gradient: ['#f7971e', '#ffd200'],
  },
  {
    id: 'tools',
    title: 'Lawn Tools',
    icon: '🛠️',
    tagline: 'The essentials in every shed',
    description:
      'Rakes, hoes, pruners, and hand tools for everyday Bermuda lawn care and maintenance tasks.',
    gradient: ['#e44d26', '#f16529'],
  },
  {
    id: 'fertilizers',
    title: 'Fertilizers',
    icon: '🧪',
    tagline: 'Feed your turf right',
    description:
      'Nitrogen-rich blends, slow-release granules, and seasonal feeding schedules tailored for Bermuda grass.',
    gradient: ['#56ab2f', '#a8e063'],
  },
  {
    id: 'insecticides',
    title: 'Insecticides',
    icon: '🐛',
    tagline: 'Defend against grubs & pests',
    description:
      'Target armyworms, grubs, and chinch bugs with safe, effective insecticides made for warm-season turf.',
    gradient: ['#DA4453', '#89216B'],
  },
  {
    id: 'pesticides',
    title: 'Pesticides',
    icon: '🛡️',
    tagline: 'Weed & disease control',
    description:
      'Pre-emergent & post-emergent herbicides plus fungicides to keep crabgrass and brown patch at bay.',
    gradient: ['#4776E6', '#8E54E9'],
  },
  {
    id: 'supplements',
    title: 'Supplements',
    icon: '💧',
    tagline: 'Boost soil & root health',
    description:
      'Iron supplements, humic acid, soil conditioners, and bio-stimulants for thick, dark-green Bermuda.',
    gradient: ['#00b4db', '#0083b0'],
  },
];

// ── Animated card component ────────────────────────────
function CategoryCard({ item, index }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        delay: index * 120,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        delay: index * 120,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.card,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <LinearGradient
        colors={item.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.cardGradient}
      >
        <View style={styles.cardIconContainer}>
          <Text style={styles.cardIcon}>{item.icon}</Text>
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardTagline}>{item.tagline}</Text>
        </View>
      </LinearGradient>
      <View style={styles.cardBody}>
        <Text style={styles.cardDescription}>{item.description}</Text>
        <View style={styles.cardFooter}>
          <Text style={styles.comingSoon}>Explore →</Text>
        </View>
      </View>
    </Animated.View>
  );
}

// ── Main App ───────────────────────────────────────────
export default function App() {
  const heroFade = useRef(new Animated.Value(0)).current;
  const heroScale = useRef(new Animated.Value(0.95)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(heroFade, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(heroScale, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Hero Section ─────────────────────── */}
        <LinearGradient
          colors={['#0d4f1c', '#1a8c36', '#2ecc71']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.hero}
        >
          <Animated.View
            style={[
              styles.heroContent,
              {
                opacity: heroFade,
                transform: [{ scale: heroScale }],
              },
            ]}
          >
            <Text style={styles.heroEmoji}>🌱</Text>
            <Text style={styles.heroTitle}>Mowgli</Text>
            <Text style={styles.heroSubtitle}>
              Your complete guide to a lush, healthy Bermuda lawn — from mowing
              to feeding and everything in between.
            </Text>
            <View style={styles.heroBadge}>
              <Text style={styles.heroBadgeText}>
                🏡 For Homeowners, By Experts
              </Text>
            </View>
          </Animated.View>

          {/* Decorative circles */}
          <View style={[styles.circle, styles.circle1]} />
          <View style={[styles.circle, styles.circle2]} />
          <View style={[styles.circle, styles.circle3]} />
        </LinearGradient>

        {/* ── Section Header ───────────────────── */}
        <View style={styles.sectionHeaderContainer}>
          <Text style={styles.sectionHeader}>Explore Categories</Text>
          <Text style={styles.sectionSubHeader}>
            Everything you need for a perfect Bermuda lawn
          </Text>
        </View>

        {/* ── Category Cards ───────────────────── */}
        <View style={styles.cardList}>
          {CATEGORIES.map((cat, i) => (
            <CategoryCard key={cat.id} item={cat} index={i} />
          ))}
        </View>

        {/* ── Footer ───────────────────────────── */}
        <LinearGradient
          colors={['#0d4f1c', '#145a24']}
          style={styles.footer}
        >
          <Text style={styles.footerEmoji}>🌿</Text>
          <Text style={styles.footerText}>
            Mowgli — More sections coming soon!
          </Text>
          <Text style={styles.footerSub}>Version 1.0</Text>
        </LinearGradient>
      </ScrollView>
    </View>
  );
}

// ── Styles ─────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f0',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 0,
  },

  /* Hero */
  hero: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    overflow: 'hidden',
    position: 'relative',
  },
  heroContent: {
    alignItems: 'center',
    zIndex: 2,
  },
  heroEmoji: {
    fontSize: 56,
    marginBottom: 12,
  },
  heroTitle: {
    fontSize: 38,
    fontWeight: '900',
    color: '#ffffff',
    textAlign: 'center',
    letterSpacing: 1,
    lineHeight: 44,
    textShadowColor: 'rgba(0,0,0,0.25)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  heroSubtitle: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    marginTop: 14,
    lineHeight: 22,
    paddingHorizontal: 8,
  },
  heroBadge: {
    marginTop: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 24,
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  heroBadgeText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },

  /* Decorative circles */
  circle: {
    position: 'absolute',
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  circle1: {
    width: 200,
    height: 200,
    top: -40,
    right: -60,
  },
  circle2: {
    width: 140,
    height: 140,
    bottom: -30,
    left: -40,
  },
  circle3: {
    width: 80,
    height: 80,
    top: 80,
    left: 30,
  },

  /* Section header */
  sectionHeaderContainer: {
    paddingHorizontal: 20,
    paddingTop: 28,
    paddingBottom: 8,
  },
  sectionHeader: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1a3d1a',
    letterSpacing: 0.5,
  },
  sectionSubHeader: {
    fontSize: 14,
    color: '#5a7a5a',
    marginTop: 4,
  },

  /* Card list */
  cardList: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 24,
  },

  /* Card */
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    marginBottom: 18,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 12,
      },
      android: {
        elevation: 6,
      },
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 12,
      },
    }),
  },
  cardGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 20,
  },
  cardIconContainer: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  cardIcon: {
    fontSize: 28,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: 0.3,
  },
  cardTagline: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.85)',
    marginTop: 2,
  },
  cardBody: {
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  cardDescription: {
    fontSize: 14,
    color: '#4a4a4a',
    lineHeight: 21,
  },
  cardFooter: {
    marginTop: 10,
    alignItems: 'flex-end',
  },
  comingSoon: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1a8c36',
    letterSpacing: 0.3,
  },

  /* Footer */
  footer: {
    paddingVertical: 32,
    alignItems: 'center',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  footerEmoji: {
    fontSize: 28,
    marginBottom: 8,
  },
  footerText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    fontWeight: '600',
  },
  footerSub: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 12,
    marginTop: 6,
  },
});
