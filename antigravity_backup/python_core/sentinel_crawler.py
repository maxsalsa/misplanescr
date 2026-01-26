import os
import time
import requests
import hashlib
import logging
import random
from bs4 import BeautifulSoup
from urllib.parse import urljoin

# Configuración de Logs Sovereign
logging.basicConfig(level=logging.INFO, format='%(asctime)s - [SENTINEL-KAIZEN] - %(message)s')
logger = logging.getLogger(__name__)

class SentinelCrawler:
    """
    🕷️ SENTINEL CRAWLER (THE AUTONOMOUS CURATOR) - KAIZEN 2000.0
    Implements 'Steady Crawl' protocol: Paused, recursive, value-focused.
    """
    
    def __init__(self):
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
        }
        self.sources = {
            # KAIZEN 3000.0 TARGETS (Global Sovereign Sovereignty)
            "mundoprimaria": "https://www.mundoprimaria.com/recursos-educativos",
            "proferecursos": "https://www.proferecursos.com/",
            "webdelmaestro": "https://webdelmaestro.com/",
            "recursosdidacticos": "https://www.recursosdidacticos.org/",
            "materialeseducativos": "https://materialeseducativos.org/"
        }
        self.visited = set()
        self.max_depth = 2

    def calculate_hash(self, content):
        """Generates a fingerprint for change detection."""
        return hashlib.sha256(content).hexdigest()

    def check_visual_simplicity(self, text_content):
        """
        KAIZEN 3000 FILTER: Heuristic check for 'Success Patterns'.
        Rejects overly dense text blocks (academic papers) vs clear step-by-step logic.
        """
        if not text_content or len(text_content) < 300: return False # Too short
        
        # Simple heuristic: Bullet points vs Paragraph density
        bullet_count = text_content.count('•') + text_content.count('- ') + text_content.count('1.')
        if bullet_count > 3:
            return True
        return False

    def polite_request(self, url):
        """Executes a request with 'Steady Crawl' courtesy (anti-ban)."""
        if url in self.visited:
            return None
        
        try:
            # Steady Crawl: Random delay between 2 and 5 seconds
            delay = random.uniform(2.0, 5.0)
            time.sleep(delay)
            
            response = requests.get(url, headers=self.headers, timeout=20)
            if response.status_code == 200:
                self.visited.add(url)
                return response.content
            else:
                logger.warning(f"⚠️ Failed to access {url}: Status {response.status_code}")
                return None
        except Exception as e:
            logger.error(f"❌ Connection error {url}: {e}")
            return None

    def analyze_value_structure(self, soup):
        """
        Analyzes the HTML structure to determine if it's a 'High Value' resource.
        Returns: (quality_score, metadata)
        """
        score = 0
        metadata = {"visual_structure": "text-heavy"}
        
        # 1. Check for Downloadables
        downloads = soup.find_all('a', href=re.compile(r'\.(pdf|docx|zip)$'))
        if downloads:
            score += 40
            metadata["downloadable"] = True
        
        # 2. Check for Images (Visual Impact)
        images = soup.find_all('img')
        if len(images) > 3:
            score += 20
            metadata["visual_structure"] = "rich"
            
        # 3. Content Length (Flow)
        text_length = len(soup.get_text())
        if text_length > 1000:
            score += 20
        
        # 4. Success Factors (Social Proof - naïve check)
        if soup.find(string=re.compile(r'comentarios|vistas|compartidos', re.I)):
            score += 10
            metadata["social_proof"] = "detected"
            
        return score, metadata

    def crawl_source(self, source_key):
        """Recursively scans a source for high-value pedagogical assets."""
        url = self.sources.get(source_key)
        if not url:
            return []

        logger.info(f"🚀 Launching Steady Curator against {source_key} ({url})...")
        content = self.polite_request(url)
        if not content:
            return []

        soup = BeautifulSoup(content, 'html.parser')
        findings = []

        # Logic: Extract links that look like Activities/Resources
        for link in soup.find_all('a', href=True):
            href = link['href']
            full_url = urljoin(url, href)
            text = link.get_text(strip=True)
            
            # Keywords for "Gold Mine"
            keywords = ["ficha", "actividad", "taller", "rubrica", "juego", "planeacion"]
            
            if any(k in text.lower() or k in full_url.lower() for k in keywords):
                findings.append({
                    "url": full_url,
                    "text": text,
                    "source": source_key,
                    "type": "resource_page" # Need to visit deeper
                })
        
        # Limit findings per cycle for "Steady" control
        return findings[:10] 

    def run_cycle(self):
        """Executes one steady curation cycle."""
        all_findings = []
        for key in self.sources:
            try:
                findings = self.crawl_source(key)
                all_findings.extend(findings)
            except Exception as e:
                logger.error(f"⚠️ Error crawling {key}: {e}")
        return all_findings
