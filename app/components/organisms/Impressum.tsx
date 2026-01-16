export default function LegalNotice() {
  return (
    <section className="w-full px-6 py-16 flex justify-center">
      <div className="max-w-3xl w-full space-y-10">
        {/* Page title */}
        <header className="text-center">
          <h1 className="text-3xl font-semibold text-white">
            <span className="text-white">Impressum: Disclaimer, Datenschutz & Urheberrecht</span>
          </h1>
        </header>

        {/* Content box */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 space-y-8 text-white/80 leading-relaxed">
          {/* Studentisches Lehrprojekt */}
          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-green-400">
              Studentisches Lehrprojekt
            </h2>
            <p>
              Diese Website ist ein Lehrprojekt, das im Rahmen des Moduls
              "Digital Media & Webtechnologien" im Studiengang Medien- und
              Kommunikationsinformatik (B.Sc.) an der Hochschule Reutlingen
              erstellt wurde.
            </p>
            <p>
              <strong className="text-white">Erstellt von:</strong> Gruppe 11
              <br />
              <strong className="text-white">Semester:</strong> Wintersemester
              2025/26
              <br />
              <strong className="text-white">Hochschule:</strong> Hochschule
              Reutlingen, Fakultät Informatik
              <br />
              <strong className="text-white">Projektabgabe:</strong> 16.01.2026
            </p>
          </section>

          <hr className="border-white/10" />

          {/* Disclaimer / Haftungsausschluss */}
          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-green-400">
              Disclaimer / Haftungsausschluss
            </h2>

            <div className="space-y-2">
              <h3 className="text-white font-semibold">Zweck des Projekts</h3>
              <p>
                Diese Website wurde ausschließlich zu Lehr- und Lernzwecken
                erstellt, um technische und gestalterische Kompetenzen im Bereich
                der Webentwicklung zu erwerben und zu demonstrieren. Die
                dargestellten Produkte, Dienstleistungen und Inhalte sind fiktiv
                oder nicht fachlich geprüft und dienen allein der
                Veranschaulichung technischer Umsetzungsmöglichkeiten.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-white font-semibold">Haftungsausschluss</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong className="text-white">
                    Keine echten Dienstleistungen:
                  </strong>{" "}
                  Die auf dieser Website beworbenen oder dargestellten Produkte
                  und Dienstleistungen werden nicht real angeboten. Es können
                  keine Bestellungen, Käufe oder Buchungen getätigt werden.
                </li>
                <li>
                  <strong className="text-white">
                    Keine Gewähr für Inhalte:
                  </strong>{" "}
                  Die präsentierten Informationen (z.B. zu Gesundheit, Ernährung,
                  Finanzen oder anderen Fachthemen) wurden nicht fachlich geprüft
                  und dienen ausschließlich zu Demonstrationszwecken. Sie stellen
                  keine fachliche Beratung dar und dürfen nicht als solche
                  verwendet werden.
                </li>
                <li>
                  <strong className="text-white">
                    Keine Haftung für Funktionalitäten:
                  </strong>{" "}
                  Eventuelle Registrierungs-, Kommentar- oder Kontaktfunktionen
                  dienen ausschließlich der Demonstration technischer
                  Funktionalitäten. Die Hochschule Reutlingen und die Studierenden
                  übernehmen keine Haftung für die Funktionsfähigkeit oder
                  Sicherheit dieser Features.
                </li>
                <li>
                  <strong className="text-white">Externe Links:</strong> Für
                  Inhalte externer Websites, auf die verlinkt wird, übernehmen
                  weder die Studierenden noch die Hochschule Reutlingen eine
                  Haftung.
                </li>
                <li>
                  <strong className="text-white">Eigenverantwortung:</strong> Die
                  Nutzung dieser Website erfolgt auf eigene Verantwortung. Weder
                  die Studierenden noch die Hochschule Reutlingen übernehmen
                  Haftung für Schäden jeglicher Art, die aus der Nutzung dieser
                  Website oder der darin enthaltenen Informationen entstehen.
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="text-white font-semibold">Verantwortlichkeit</h3>
              <p>
                Für die Inhalte dieser Website sind die Studierenden im Rahmen
                ihres Lehrprojekts verantwortlich. Die Hochschule Reutlingen
                übernimmt keine Haftung für die Richtigkeit, Vollständigkeit oder
                Aktualität der dargestellten Informationen.
              </p>
              <p>
                <strong className="text-white">Kontakt bei Fragen:</strong>
                <br />
                Fakultät Informatik
                <br />
                Hochschule Reutlingen
                <br />
                Alteburgstraße 150
                <br />
                72762 Reutlingen
                <br />
                anja.hartmann@reutlingen-university.de
              </p>
            </div>
          </section>

          <hr className="border-white/10" />

          {/* Datenschutzerklärung */}
          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-green-400">
              Datenschutzerklärung
            </h2>

            <div className="space-y-2">
              <h3 className="text-white font-semibold">Verantwortlicher</h3>
              <p>
                Dieses Projekt wurde im Rahmen der Lehre an der Hochschule
                Reutlingen erstellt.
              </p>
              <p>
                <strong className="text-white">
                Hochschule Reutlingen
                </strong>
                <br />
                Alteburgstraße 150
                <br />
                72762 Reutlingen
                <br />
                Deutschland
              </p>
              <p>
                <strong className="text-white">
                  Datenschutzbeauftragter der Hochschule Reutlingen:
                </strong>
                <br />
                maximilian.musch@reutlingen-university.de
              </p>
              <p>
                <strong className="text-white">
                  Studentisches Projekt erstellt von:
                </strong>{" "}
                Gruppe 11
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-white font-semibold">Status des Projekts</h2>
              <p>
                Wichtiger Hinweis: Dieses Projekt wurde am 16.01.2026 abgegeben und die Deaktivierung wird am 01.03.2026 abgeschlossen.
                Seit diesem Zeitpunkt werden keine neuen personenbezogenen Daten mehr erfasst. Alle Funktionen zur
                Datenerfassung (Registrierung, Kommentare, Kontaktformulare) werden deaktiviert.
                Die Website dient ausschließlich als Showcase-Projekt zur Demonstration der erworbenen technischen
                Fähigkeiten und ist Teil des studentischen Portfolios.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-white font-semibold">
                1. Welche Daten wurden erfasst? (während der aktiven Projektphase)
              </h3>
              <p>
                Während der aktiven Entwicklungs- und Testphase des Projekts konnten
                folgende personenbezogene Daten erfasst worden sein:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  Bei Registrierung: Benutzername, E-Mail-Adresse, Passwort
                  (verschlüsselt)
                </li>
                <li>
                  Bei Kommentaren: Name, E-Mail-Adresse (optional), Kommentartext
                </li>
                <li>
                  Bei Kontaktformularen: Name, E-Mail-Adresse, Nachrichtentext
                </li>
                <li>
                  Technische Daten: IP-Adresse, Browser-Typ, Betriebssystem
                  (automatisch durch Server-Logs erfasst)
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="text-white font-semibold">2. Zweck der Datenverarbeitung</h3>
              <p>
                Die Datenverarbeitung erfolgte ausschließlich zu didaktischen Zwecken
                im Rahmen eines Hochschulprojekts zur:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  Demonstration technischer Funktionalitäten (Datenbankanbindung,
                  User-Management, Kommentarsysteme)
                </li>
                <li>Erlernung von Webentwicklungs-Best-Practices</li>
                <li>Bewertung der technischen Umsetzung durch Lehrende</li>
              </ul>
              <p>
                Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse
                an Lehre und Ausbildung)
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-white font-semibold">3. Speicherdauer und Löschung</h3>
              <p>
                Während der aktiven Projektphase erfasste Daten:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  Die im Rahmen der Entwicklungs- und Testphase erfassten Daten werden
                  nicht mehr aktiv genutzt
                </li>
                <li>
                  Bestehende Test- und Beispieldaten verbleiben in der Datenbank als
                  Teil des Portfolio-Projekts
                </li>
                <li>
                  Betroffene Personen können jederzeit die Löschung ihrer Daten verlangen
                  (siehe Rechte weiter unten)
                </li>
              </ul>
              <p>Neue Daten (seit Deaktivierung):</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Es werden keine neuen personenbezogenen Daten mehr erfasst</li>
              </ul>
              <p>Server-Logs:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  Technische Logs (IP-Adressen, Zugriffsdaten) werden vom Hosting-Provider
                  (Vercel) gemäß dessen Datenschutzrichtlinien verarbeitet und nach 30–90 Tagen
                  automatisch gelöscht
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="text-white font-semibold">4. Weitergabe an Dritte</h3>
              <p>Personenbezogene Daten werden nicht an Dritte weitergegeben.</p>
              <p>
                Ausnahme – Technische Dienstleister:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong className="text-white">Hosting:</strong> Die Website wird auf Vercel gehostet.
                  Vercel verarbeitet Daten im Rahmen einer Auftragsverarbeitung.
                  Datenschutzerklärung von Vercel: https://vercel.com/legal/privacy-policy
                </li>
                <li>
                  <strong className="text-white">Datenbank:</strong> PostgreSQL (Neon, betrieben über Vercel)
                  verarbeitet Daten als technischer Dienstleister.
                </li>
              </ul>
              <p>
                Diese Dienstleister verarbeiten Daten ausschließlich nach unseren Weisungen und sind
                vertraglich zur Einhaltung der DSGVO verpflichtet.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-white font-semibold">5. Ihre Rechte (Art. 15–22 DSGVO)</h3>
              <p>Sie haben jederzeit das Recht auf:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Auskunft (Art. 15 DSGVO): Welche Ihrer Daten wurden gespeichert?</li>
                <li>Berichtigung (Art. 16 DSGVO): Korrektur falscher Daten</li>
                <li>Löschung (Art. 17 DSGVO): Löschung Ihrer Daten ("Recht auf Vergessenwerden")</li>
                <li>Einschränkung (Art. 18 DSGVO): Einschränkung der Verarbeitung</li>
                <li>Datenübertragbarkeit (Art. 20 DSGVO): Erhalt Ihrer Daten in maschinenlesbarem Format</li>
                <li>Widerspruch (Art. 21 DSGVO): Widerspruch gegen die Verarbeitung</li>
              </ul>
              <p>
                <strong>
                So machen Sie Ihre Rechte geltend:
                </strong>
                <br />
                Senden Sie eine E-Mail an: anja.hartmann@reutlingen-university.de
                <br />
                oder schreiben Sie an:
                <br />
                Fakultät Informatik, Hochschule Reutlingen, Alteburgstraße 150, 72762 Reutlingen
                <br />
                Wir werden Ihre Anfrage innerhalb von 30 Tagen bearbeiten.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-white font-semibold">6. Beschwerderecht</h3>
              <p>
                Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren, wenn Sie der
                Ansicht sind, dass die Verarbeitung Ihrer Daten gegen die DSGVO verstößt.
              </p>
              <p>
                <strong>
                Zuständige Aufsichtsbehörde:
                </strong>
                <br />
                Der Landesbeauftragte für den Datenschutz und die Informationsfreiheit Baden-Württemberg
                <br />
                Königstraße 10a
                <br />
                70173 Stuttgart
                <br />
                Telefon: 0711/615541-0
                <br />
                E-Mail: poststelle@lfdi.bwl.de
                <br />
                Website: www.baden-wuerttemberg.datenschutz.de
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-white font-semibold">7. Cookies und Tracking</h3>
              <p>
                Cookies: Diese Website verwendet nur technisch notwendige Cookies für die
                Session-Verwaltung. Es erfolgt keine Nachverfolgung Ihres Nutzerverhaltens zu
                Werbezwecken.
              </p>
              <p>
                Kein Tracking: Es werden keine Tracking-Tools wie Google Analytics, Facebook Pixel oder
                ähnliche Dienste eingesetzt.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-white font-semibold">8. Sicherheit</h3>
              <p>Während der aktiven Projektphase wurden folgende Sicherheitsmaßnahmen implementiert:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Verschlüsselte Übertragung via HTTPS</li>
                <li>Passwörter werden gehasht gespeichert (nicht im Klartext)</li>
                <li>Schutz vor SQL-Injection durch Prepared Statements</li>
                <li>Input-Validierung zum Schutz vor Cross-Site-Scripting (XSS)</li>
              </ul>
            </div>
          </section>

          <hr className="border-white/10" />

          {/* Urheberrecht */}
          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-green-400">Urheberrecht</h2>
            <p>
              Die Inhalte, Texte, Bilder und Grafiken dieser Website wurden im Rahmen des Lehrprojekts
              erstellt oder stammen aus lizenzfreien Quellen bzw. wurden mit entsprechenden
              Nutzungsrechten verwendet.
            </p>
            <p>
              <strong className="text-white">Quellen / Fremdmaterialien:</strong>
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Bilder: KI-generierte Bilder (Hero-Bereich, Infografik)</li>
              <li>Icons: Lucide Icons</li>
              <li>Schriftarten: System- & Webfonts</li>
            </ul>
            <p>
              Eine Weiterverwendung oder Vervielfältigung der Inhalte außerhalb dieser Website bedarf
              der ausdrücklichen Zustimmung.
            </p>
          </section>

          <hr className="border-white/10" />

          {/* Kontakt */}
          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-green-400">Kontakt</h2>
            <p>
              Bei Fragen zu diesem Projekt, zur Datenschutzerklärung oder zur Ausübung Ihrer Rechte wenden
              Sie sich bitte an:
            </p>
            <p>
              E-Mail: anja.hartmann@reutlingen-university.de
              <br />
              Postanschrift:
              <br />
              Hochschule Reutlingen, Fakultät Informatik
              <br />
              Alteburgstraße 150
              <br />
              72762 Reutlingen
            </p>
          </section>

          <hr className="border-white/10" />

          {/* Stand */}
          <section className="space-y-1">
            <p>
              <strong className="text-white">Stand:</strong> 16.01.2026
              <br />
              <strong className="text-white">Letzte Aktualisierung:</strong> 16.01.2026
            </p>
          </section>
        </div>
      </div>
    </section>
  );
}