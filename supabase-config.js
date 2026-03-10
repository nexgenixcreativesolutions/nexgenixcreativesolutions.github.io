// ============================================================
// SUPABASE CONFIG — shared across all NGCS + NGBS pages
// Include this script BEFORE any page-specific scripts
// ============================================================
const SUPABASE_URL  = 'https://rranivozhrsldhapzwqc.supabase.co';
const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJyYW5pdm96aHJzbGRoYXB6d3FjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAxNzIxMzcsImV4cCI6MjA4NTc0ODEzN30.0wOlQErCvNbf9LhhWzecDINB6523BHqgc2G2v0wURGQ';

const _sb = supabase.createClient(SUPABASE_URL, SUPABASE_ANON);

// ── AUTH HELPERS ─────────────────────────────────────────────

async function getSession() {
  const { data: { session } } = await _sb.auth.getSession();
  return session;
}

async function getUser() {
  const session = await getSession();
  return session ? session.user : null;
}

async function getProfile(userId) {
  const { data, error } = await _sb
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  if (error) { console.error('getProfile error:', error); return null; }
  return data;
}

// Guard: redirect to NGCS login if not authenticated
// Pass returnURL to come back after login
async function requireAuth(returnURL) {
  const session = await getSession();
  if (!session) {
    const redirect = returnURL || window.location.href;
    window.location.href =
      'https://nexgenixcreativesolutions.github.io/login-signup' +
      '?redirect=' + encodeURIComponent(redirect);
    return null;
  }
  return session;
}

// Guard: redirect to NGCS login if not admin
async function requireAdmin() {
  const session = await requireAuth(window.location.href);
  if (!session) return null;
  const profile = await getProfile(session.user.id);
  if (!profile || profile.role !== 'admin') {
    alert('Access denied. Admin only.');
    window.location.href = 'https://nexgenixcreativesolutions.github.io/dashboard';
    return null;
  }
  return { session, profile };
}

async function signOut(redirectTo) {
  await _sb.auth.signOut();
  window.location.href = redirectTo ||
    'https://nexgenixcreativesolutions.github.io/login-signup';
}
