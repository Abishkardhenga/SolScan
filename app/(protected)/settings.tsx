import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { useAuth } from '@/hooks/useAuth';
import { useColorScheme } from '@/hooks/useColorScheme';

// ============================================
// Helpers
// ============================================

const shortId = (id: string) => {
  if (id.length <= 14) return id;
  return `${id.slice(0, 6)}···${id.slice(-6)}`;
};

// ============================================
// Settings Screen
// ============================================

export default function SettingsScreen() {
  const colorScheme = useColorScheme();
  const { user, signOut } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await signOut();
    } catch (error) {
      console.error('Sign out error:', error);
    } finally {
      setLoading(false);
    }
  };

  const initials = user?.email
    ? user.email.substring(0, 2).toUpperCase()
    : '??';

  const memberSince = user?.metadata.creationTime
    ? new Date(user.metadata.creationTime).toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
      })
    : 'N/A';

  return (
    <SafeAreaView style={s.safe}>
      <ScrollView style={s.scroll}>
        {/* Header */}
        <Text style={s.title}>Settings</Text>
        <Text style={s.subtitle}>Manage your account & preferences</Text>

        {/* Profile Card */}
        <View style={s.profileCard}>
          <View style={s.profileHeader}>
            <View style={s.avatar}>
              <Text style={s.avatarText}>{initials}</Text>
            </View>
            <View style={s.profileInfo}>
              <Text style={s.profileEmail} numberOfLines={1}>
                {user?.email ?? 'Not signed in'}
              </Text>
              <Text style={s.profileMeta}>Member since {memberSince}</Text>
            </View>
          </View>

          <View style={s.divider} />

          {/* Info Rows */}
          <View style={s.infoRow}>
            <Text style={s.infoLabel}>User ID</Text>
            <View style={s.idBadge}>
              <Text style={s.idText}>
                {user?.uid ? shortId(user.uid) : 'N/A'}
              </Text>
            </View>
          </View>

          <View style={s.infoRow}>
            <Text style={s.infoLabel}>Email Verified</Text>
            <View
              style={[
                s.statusBadge,
                user?.emailVerified ? s.statusGreen : s.statusYellow,
              ]}
            >
              <Text
                style={[
                  s.statusText,
                  user?.emailVerified ? s.statusGreenText : s.statusYellowText,
                ]}
              >
                {user?.emailVerified ? 'Verified' : 'Unverified'}
              </Text>
            </View>
          </View>

          <View style={s.infoRow}>
            <Text style={s.infoLabel}>Network</Text>
            <View style={s.networkBadge}>
              <View style={s.networkDot} />
              <Text style={s.networkText}>Mainnet</Text>
            </View>
          </View>
        </View>

        {/* Preferences Section */}
        <Text style={s.sectionTitle}>PREFERENCES</Text>
        <View style={s.card}>
          <View style={s.settingRow}>
            <View style={s.settingIconWrap}>
              <Text style={s.settingIcon}>◑</Text>
            </View>
            <View style={s.settingContent}>
              <Text style={s.settingLabel}>Theme</Text>
              <Text style={s.settingDesc}>Follows system appearance</Text>
            </View>
            <View style={s.settingValueBadge}>
              <Text style={s.settingValueText}>
                {colorScheme === 'dark' ? 'Dark' : 'Light'}
              </Text>
            </View>
          </View>
        </View>

        {/* App Info Section */}
        <Text style={s.sectionTitle}>APP INFO</Text>
        <View style={s.card}>
          <View style={s.settingRow}>
            <View style={s.settingIconWrap}>
              <Text style={s.settingIcon}>⬡</Text>
            </View>
            <View style={s.settingContent}>
              <Text style={s.settingLabel}>Version</Text>
            </View>
            <Text style={s.settingValue}>1.0.0</Text>
          </View>

          <View style={s.rowDivider} />

          <View style={s.settingRow}>
            <View style={s.settingIconWrap}>
              <Text style={s.settingIcon}>◈</Text>
            </View>
            <View style={s.settingContent}>
              <Text style={s.settingLabel}>Build</Text>
            </View>
            <Text style={s.settingValue}>2026.02</Text>
          </View>

          <View style={s.rowDivider} />

          <View style={s.settingRow}>
            <View style={s.settingIconWrap}>
              <Text style={s.settingIcon}>⊞</Text>
            </View>
            <View style={s.settingContent}>
              <Text style={s.settingLabel}>Platform</Text>
            </View>
            <Text style={s.settingValue}>Expo</Text>
          </View>
        </View>

        {/* Danger Zone */}
        <Text style={s.sectionTitle}>ACCOUNT</Text>
        <TouchableOpacity
          style={s.signOutBtn}
          onPress={handleSignOut}
          disabled={loading}
          activeOpacity={0.7}
        >
          {loading ? (
            <ActivityIndicator color="#EF4444" />
          ) : (
            <Text style={s.signOutText}>Sign Out</Text>
          )}
        </TouchableOpacity>

        <View style={{ height: 80 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

// ============================================
// Styles — matching home page dark theme
// ============================================

const s = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#0D0D12',
  },
  scroll: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
  },

  // Header
  title: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    color: '#6B7280',
    fontSize: 15,
    marginBottom: 28,
    fontWeight: '400',
  },

  // Profile Card
  profileCard: {
    backgroundColor: '#16161D',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: '#2A2A35',
    marginBottom: 28,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#9945FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    shadowColor: '#9945FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 1,
  },
  profileInfo: {
    flex: 1,
  },
  profileEmail: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 4,
  },
  profileMeta: {
    color: '#6B7280',
    fontSize: 13,
    fontWeight: '400',
  },

  divider: {
    height: 1,
    backgroundColor: '#2A2A35',
    marginBottom: 16,
  },

  // Info Rows
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  infoLabel: {
    color: '#6B7280',
    fontSize: 14,
    fontWeight: '500',
  },
  idBadge: {
    backgroundColor: '#1E1E28',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 8,
  },
  idText: {
    color: '#9945FF',
    fontSize: 13,
    fontFamily: 'monospace',
    fontWeight: '500',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
  },
  statusGreen: {
    backgroundColor: 'rgba(20, 241, 149, 0.12)',
  },
  statusYellow: {
    backgroundColor: 'rgba(250, 204, 21, 0.12)',
  },
  statusText: {
    fontSize: 13,
    fontWeight: '600',
  },
  statusGreenText: {
    color: '#14F195',
  },
  statusYellowText: {
    color: '#FACC15',
  },
  networkBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(20, 241, 149, 0.08)',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
  },
  networkDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#14F195',
    marginRight: 6,
  },
  networkText: {
    color: '#14F195',
    fontSize: 13,
    fontWeight: '600',
  },

  // Section Title
  sectionTitle: {
    color: '#6B7280',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1.5,
    marginBottom: 12,
    marginLeft: 4,
  },

  // Cards
  card: {
    backgroundColor: '#16161D',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#2A2A35',
    marginBottom: 28,
    overflow: 'hidden',
  },

  // Setting Rows
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 18,
  },
  settingIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#1E1E28',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  settingIcon: {
    fontSize: 16,
    color: '#9CA3AF',
  },
  settingContent: {
    flex: 1,
  },
  settingLabel: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '500',
  },
  settingDesc: {
    color: '#6B7280',
    fontSize: 12,
    fontWeight: '400',
    marginTop: 2,
  },
  settingValue: {
    color: '#6B7280',
    fontSize: 14,
    fontWeight: '500',
  },
  settingValueBadge: {
    backgroundColor: '#1E1E28',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 8,
  },
  settingValueText: {
    color: '#14F195',
    fontSize: 13,
    fontWeight: '600',
  },

  rowDivider: {
    height: 1,
    backgroundColor: '#2A2A35',
    marginHorizontal: 18,
  },

  // Sign Out
  signOutBtn: {
    backgroundColor: 'rgba(239, 68, 68, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.2)',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signOutText: {
    color: '#EF4444',
    fontSize: 16,
    fontWeight: '600',
  },
});
