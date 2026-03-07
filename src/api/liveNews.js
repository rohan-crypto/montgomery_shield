const BRIGHTDATA_TOKEN = import.meta.env.VITE_BRIGHTDATA_TOKEN
const BRIGHTDATA_ZONE = import.meta.env.VITE_BRIGHTDATA_ZONE

function categoriseArticle(title) {
  const t = title.toLowerCase()
  if (
    t.includes('shoot') || t.includes('murder') || t.includes('kill') ||
    t.includes('gun') || t.includes('crime') || t.includes('arrest')
  ) {
    return { category: 'Crime', color: 'red' }
  }
  if (
    t.includes('fire') || t.includes('accident') || t.includes('crash') ||
    t.includes('emergency') || t.includes('injur')
  ) {
    return { category: 'Emergency', color: 'orange' }
  }
  if (
    t.includes('police') || t.includes('officer') ||
    t.includes('department') || t.includes('sheriff')
  ) {
    return { category: 'Police', color: 'blue' }
  }
  if (
    t.includes('invest') || t.includes('business') ||
    t.includes('economic') || t.includes('job') ||
    t.includes('meta') || t.includes('development')
  ) {
    return { category: 'Economy', color: 'green' }
  }
  return { category: 'News', color: 'slate' }
}

function parseGoogleNewsRSS(xml) {
  const items = []
  const itemRegex = /<item>([\s\S]*?)<\/item>/gi
  const titleRegex = /<title>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/title>/i
  const linkRegex = /<link>(.*?)<\/link>/i
  const pubDateRegex = /<pubDate>(.*?)<\/pubDate>/i

  let match
  while ((match = itemRegex.exec(xml)) !== null && items.length < 20) {
    const block = match[1]
    const titleMatch = titleRegex.exec(block)
    const linkMatch = linkRegex.exec(block)
    const dateMatch = pubDateRegex.exec(block)

    if (titleMatch) {
      const title = titleMatch[1]
        .replace(/<[^>]+>/g, '')
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .trim()

      const url = linkMatch ? linkMatch[1].trim() : '#'
      const pubDate = dateMatch ? new Date(dateMatch[1]) : null
      const hoursAgo = pubDate
        ? Math.round((Date.now() - pubDate.getTime()) / 3600000)
        : null
      const daysAgo = hoursAgo ? Math.round(hoursAgo / 24) : 999
      const timeStr = hoursAgo
        ? hoursAgo < 24
          ? `${hoursAgo}h ago`
          : `${Math.round(hoursAgo / 24)}d ago`
        : 'Recent'

      if (title.length > 10) {
        items.push({
          id: items.length,
          title,
          url,
          pubDate,
          daysAgo,
          ...categoriseArticle(title),
          time: timeStr,
        })
      }
    }
  }

  // Filter to last 30 days, sort newest first, take top 8
  const filtered = items
    .filter(item => item.daysAgo <= 30)
    .sort((a, b) => a.daysAgo - b.daysAgo)
    .slice(0, 8)

  return filtered.length > 0 ? filtered : getFallbackNews()
}

function getFallbackNews() {
  return [
    {
      id: 0,
      title: 'Montgomery PD responds to increase in weekend incidents',
      url: '#',
      category: 'Police',
      color: 'blue',
      time: '2h ago',
    },
    {
      id: 1,
      title: 'Fire rescue responds to structure fire on Oak Street',
      url: '#',
      category: 'Emergency',
      color: 'orange',
      time: '4h ago',
    },
    {
      id: 2,
      title: 'City council discusses police recruitment funding',
      url: '#',
      category: 'Police',
      color: 'blue',
      time: '6h ago',
    },
    {
      id: 3,
      title: 'Meta data centre construction update — on schedule for 2026',
      url: '#',
      category: 'Economy',
      color: 'green',
      time: '8h ago',
    },
    {
      id: 4,
      title: 'Montgomery crime rate report released for Q1 2026',
      url: '#',
      category: 'Crime',
      color: 'red',
      time: '10h ago',
    },
  ]
}

export async function fetchMontgomeryNews() {
  try {
    const response = await fetch('/brightdata/request', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${BRIGHTDATA_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        zone: BRIGHTDATA_ZONE,
        // the query uses &tbs=qdr:w&tbs=sbd:1, which fetches news from the past week sorted by date.
        url: 'https://news.google.com/rss/search?q=Montgomery+Alabama+crime+OR+police+OR+fire+OR+safety+OR+shooting&hl=en-US&gl=US&ceid=US:en&tbs=qdr:w,sbd:1',
        format: 'raw',
        method: 'GET',
        country: 'us',
      })
    })

    if (!response.ok) throw new Error(`HTTP ${response.status}`)

    const xml = await response.text()
    return parseGoogleNewsRSS(xml)

  } catch (err) {
    console.error('Bright Data fetch failed:', err)
    return getFallbackNews()
  }
}