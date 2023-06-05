"use client";
import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from './page.module.css'
import {useState} from "react";
import { useTranslation, Trans } from 'react-i18next';
import './i18n.js'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { t, i18n } = useTranslation();
  const [sites, setSites] = useState(
      typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('favoriteSites')) || [] : []
  );
  const [showAddSite, setShowAddSite] = useState(false);
  const [newSiteUrl, setNewSiteUrl] = useState('');
  const [newSiteName, setNewSiteName] = useState('');

  // Open site in new tab/window
  const openSite = (url) => {
    window.open(url, '_blank');
  };

  // Add site to favorite sites
  const addSite = () => {
    if (newSiteUrl.trim() === '') return;

    // Create an anchor element to parse the URL
    const parser = document.createElement('a');
    parser.href = newSiteUrl;

    // Extract site title and favicon URL
    const siteTitle = parser.hostname;
    const siteFaviconUrl = `${parser.protocol}//${parser.hostname}/favicon.ico`;

    // Create site object
    const newSite = {
      url: newSiteUrl,
      title: newSiteName==='' ? siteTitle : newSiteName,
      faviconUrl: siteFaviconUrl,
    };

    // Update saved sites
    const updatedSites = [...sites, newSite];
    setSites(updatedSites);

    // Save sites to local storage
    localStorage.setItem('favoriteSites', JSON.stringify(updatedSites));

    // Reset input values and hide popup
    setNewSiteUrl('');
    setNewSiteName('');
    setShowAddSite(false);
  };

  const cancelAddSite = () =>{
    setNewSiteUrl('');
    setNewSiteName('');
    setShowAddSite(false);
  }

  const removeSite = (index) => {
    const updatedSites = [...sites];
    updatedSites.splice(index, 1);
    setSites(updatedSites);
    localStorage.setItem('favoriteSites', JSON.stringify(updatedSites));
  };

  return (
      <>
        <Head>
          <title>Home</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <main className={styles.main}>
          <div className="favorite-websites">
            <div className="site-container">
              {sites.map((site, index) => (
                  <div className="site" key={index}>
                    <div onClick={() => openSite(site.url)}>
                      <img src={site.faviconUrl} alt="Site Icon" />
                    </div>
                    <span onClick={() => openSite(site.url)}>{site.title}</span>
                    <span className="site delete-icon" onClick={() => removeSite(index)}>
                  &times;
                </span>
                  </div>
              ))}
              <div className="site add-site" onClick={() => setShowAddSite(true)}>
                <span>+</span>
              </div>
            </div>

            {showAddSite && (
                <div className="add-site-popup">
                  <input
                      type="url"
                      placeholder={t('enterURL')}
                      value={newSiteUrl}
                      onChange={(e) => setNewSiteUrl(e.target.value)}
                  />
                  <input
                      type="text"
                      placeholder={t('enterName')}
                      value={newSiteName}
                      onChange={(e) => setNewSiteName(e.target.value)}
                  />
                  <div>
                    <button onClick={addSite}>{t('addButton')}</button>
                    <button onClick={cancelAddSite}>{t('cancelButton')}</button>
                  </div>

                </div>
            )}
          </div>
        </main>
      </>
  );
}
