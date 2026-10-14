const KALP_BIZ_PAGES_API = 'https://biz.kalptree.xyz/api/cms/pages';
const TENANT_DB = process.env.NEXT_PUBLIC_TENANT_ID || 'kp_hotel_luxora';
const TENANT_SLUG = process.env.NEXT_PUBLIC_TENANT_SLUG || 'hotel-luxora';

export async function syncPageToKalpAdmin(page: {
  slug: string;
  title: any;
  content: any;
  metaTitle?: any;
  metaDescription?: any;
  isPublished?: boolean;
  status?: string;
}): Promise<void> {
  if (!page || !page.slug) return;

  const headers = {
    'Content-Type': 'application/json',
    'x-tenant-db': TENANT_DB,
    'x-tenant-slug': TENANT_SLUG,
  };

  const payload = {
    title: page.title,
    slug: page.slug,
    content: page.content || [],
    metaTitle: page.metaTitle,
    metaDescription: page.metaDescription,
    isPublished: page.isPublished ?? true,
    status: page.status || (page.isPublished ? 'published' : 'draft'),
  };

  try {
    // 1. Look up remote page by slug
    const lookupRes = await fetch(`${KALP_BIZ_PAGES_API}?slug=${encodeURIComponent(page.slug)}`, {
      method: 'GET',
      headers,
    });

    let remoteId: string | null = null;
    if (lookupRes.ok) {
      const data = await lookupRes.json().catch(() => null);
      if (data?.data && (data.data.id || data.data._id)) {
        remoteId = data.data.id || data.data._id;
      }
    }

    if (remoteId) {
      // 2. Update remote page
      await fetch(`${KALP_BIZ_PAGES_API}/${remoteId}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(payload),
      });
    } else {
      // 3. Create remote page
      await fetch(KALP_BIZ_PAGES_API, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
      });
    }
  } catch (error) {
    console.warn('[KalpSync] Failed to mirror page mutation to Kalp Admin:', error);
  }
}
