import { useState } from "react";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";
import FrenchFlag from "../components/About/FrenchFlag.svg";
import EnglishFlag from "../components/About/EnglishFlag.svg";

function About() {
  const [langage, setLangage] = useState("fr");

  return (
    <div className="container mx-auto p-4 my-28 flex flex-col">
      <div className="flex items-center mb-8 justify-between">
        <h1 className="text-3xl font-extrabold">
          {langage === "fr"
            ? "Mentions Légales et Conditions d'Utilisation"
            : "Legal Information and Terms of Use"}
        </h1>
        <Menu allowHover>
          <MenuHandler>
            <Button className="flex items-center gap-2" color="white">
              <img
                src={FrenchFlag}
                alt="French flag icon used to change the language to French"
                className="w-5 h-5"
              />
              <p>/</p>
              <img
                src={EnglishFlag}
                alt="English flag icon used to change the language to English"
                className="w-5 h-5"
              />
            </Button>
          </MenuHandler>
          <MenuList>
            <MenuItem
              onClick={() => setLangage("fr")}
              className="flex items-center gap-2"
            >
              <img
                src={FrenchFlag}
                alt="French Flag Icon used to change the language to French"
                className="w-5 h-5"
              />{" "}
              Français
            </MenuItem>
            <MenuItem
              onClick={() => setLangage("en")}
              className="flex items-center gap-2"
            >
              <img
                src={EnglishFlag}
                alt="English Flag Icon used to change the language to English"
                className="w-5 h-5"
              />
              English
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
      {langage === "fr" ? (
        <>
          <section className="mb-6">
            <h2 className="text-2xl font-semibold">Avertissement Important</h2>
            <p>
              Ce site a été créé dans le cadre d'un projet personnel pour
              m'entraîner et améliorer mes compétences en développement web.
              Bien que j'ai pris soin de respecter les normes de sécurité et de
              confidentialité, il est important de noter que ce site est destiné
              à des fins d'apprentissage uniquement. Veuillez ne pas divulguer
              d'informations sensibles ou confidentielles lors de son
              utilisation. Merci de votre compréhension et de votre coopération
              ! 😊
            </p>
          </section>
          <h1 className="text-2xl font-bold mb-4">Mentions Légales</h1>
          <section className="mb-6">
            <h2 className="text-xl font-semibold">Éditeur du site</h2>
            <p>
              <strong>Lorga</strong> est un projet personnel développé et édité
              par <strong>Baris GUNAY</strong>, dans le but de m'entraîner à
              créer un site fullstack. Ce projet est purement démonstratif et
              éducatif.
            </p>
            <p>
              Contact : <strong>baris.gunay.pro@gmail.com</strong>
            </p>
            <p>
              Hébergeur : OVH SAS, 9 Rue du Bass. de l'Industrie, 67000
              Strasbourg, France.
            </p>
          </section>
          <section className="mb-6">
            <h2 className="text-xl font-semibold">
              Politique de Confidentialité
            </h2>
            <p>
              <strong>Données collectées :</strong> Ce site collecte uniquement
              les informations strictement nécessaires à l'authentification :
            </p>
            <ul className="list-disc pl-5">
              <li>Une adresse e-mail et pseudonyme</li>
              <li>Un mot de passe (chiffré et sécurisé)</li>
              <li>
                Un refresh token (cookie utilisé pour gérer la session
                utilisateur, sert à renouveler le token d'accès qui lui sert à
                accéder aux ressources protégées)
              </li>
            </ul>
            <p>
              <strong>Finalité des données :</strong> Ces données servent
              exclusivement à l’authentification. Aucune donnée n'est partagée
              avec des tiers.
            </p>
          </section>
          <section className="mb-6">
            <h2 className="text-xl font-semibold">Sécurité des données</h2>
            <p>
              J'ai utilisé tout ce qui est en mon pouvoir pour sécuriser l'accès
              aux comptes des utilisateurs. Cependant, lors du lancement
              initial, ce site peut ne pas utiliser HTTPS systématiquement.
              Toutefois, il est prévu que le site soit configuré pour utiliser
              HTTPS une fois déployé. Il est fortement déconseillé d’utiliser
              des mots de passe sensibles ou que vous utilisez sur d’autres
              sites.
            </p>
          </section>
          <section className="mb-6">
            <h2 className="text-xl font-semibold">Durée de conservation</h2>
            <p>
              Les comptes inactifs depuis plus de 12 mois peuvent être
              supprimés.
            </p>
          </section>
          <section className="mb-6">
            <h2 className="text-xl font-semibold">Droits des utilisateurs</h2>
            <p>Conformément au RGPD, vous disposez des droits suivants :</p>
            <ul className="list-disc pl-5">
              <li>Accès à vos données</li>
              <li>Rectification ou suppression de vos données</li>
              <li>Retrait de consentement</li>
              <li>Plaintes auprès de la CNIL</li>
            </ul>
            <p>
              Contact : <strong>baris.gunay.pro@gmail.com</strong>
            </p>
          </section>
          <section className="mb-6">
            <h2 className="text-xl font-semibold">Utilisation des Cookies</h2>
            <p>
              Un seul cookie (refresh token) est utilisé pour gérer
              l’authentification. Il n'est pas utilisé à des fins de suivi ou
              d’analyse.
            </p>
          </section>
          <section className="mb-6">
            <h2 className="text-xl font-semibold">Publicités</h2>
            <p>Aucune pub n'est affichée sur ce site.</p>
          </section>
          <section className="mb-6">
            <h2 className="text-xl font-semibold">
              Conditions Générales d'Utilisation (CGU)
            </h2>
            <ol className="list-decimal pl-5">
              <li>
                <strong>But du site :</strong> Projet démonstratif illustrant
                mes compétences en développement fullstack.
              </li>
              <li>
                <strong>Utilisation responsable :</strong> Il est interdit
                d’utiliser ce site à des fins illégales ou nuisibles.
              </li>
              <li>
                <strong>Sécurité :</strong> J'ai pris toutes les mesures
                possibles pour protéger les comptes, cependant, veuillez noter
                que ce site est à but d'entraînement et ne garantit pas une
                sécurité professionnelle. Par conséquent, il est recommandé
                d'éviter d'utiliser des données sensibles.
              </li>
              <li>
                <strong>Propriété intellectuelle :</strong> Le code et le design
                sont la propriété du créateur.
              </li>
              <li>
                <strong>Limitation de responsabilité :</strong> L’auteur décline
                toute responsabilité en cas de problème technique.
              </li>
              <li>
                <strong>Modifications :</strong> Les conditions peuvent évoluer,
                consultez-les régulièrement.
              </li>
            </ol>
          </section>
          <section>
            <h2 className="text-xl font-semibold">Contact</h2>
            <p>
              Pour toute question : <strong>baris.gunay.pro@gmail.com</strong>
            </p>
          </section>
        </>
      ) : (
        <>
          <section className="mb-6">
            <h2 className="text-2xl font-semibold">Important Disclaimer</h2>
            <p>
              This website was created as part of a personal project to practice
              and improve my web development skills. While I have taken care to
              follow security and privacy standards, please note that this site
              is for learning purposes only. Do not disclose any sensitive or
              confidential information while using it. Thank you for your
              understanding and cooperation! 😊
            </p>
          </section>

          <h1 className="text-2xl font-bold mb-4">Legal Notice</h1>
          <section className="mb-6">
            <h2 className="text-xl font-semibold">Site Publisher</h2>
            <p>
              <strong>Lorga</strong> is a personal project developed and
              published by <strong>Baris GUNAY</strong> to practice creating a
              full-stack website. This project is purely demonstrative and
              educational.
            </p>
            <p>
              Contact: <strong>baris.gunay.pro@gmail.com</strong>
            </p>
            <p>
              Hosting provider: OVH SAS, 9 Rue du Bass. de l'Industrie, 67000
              Strasbourg, France.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold">Privacy Policy</h2>
            <p>
              <strong>Collected Data:</strong> This site only collects strictly
              necessary authentication information:
            </p>
            <ul className="list-disc pl-5">
              <li>An email address and username</li>
              <li>A password (encrypted and secured)</li>
              <li>
                A refresh token (cookie used to manage user sessions, allowing
                the renewal of access tokens required for protected resources)
              </li>
            </ul>
            <p>
              <strong>Data Purpose:</strong> This data is used exclusively for
              authentication. No data is shared with third parties.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold">Data Security</h2>
            <p>
              I have taken all possible measures to secure user accounts.
              However, during the initial launch, this site may not
              systematically use HTTPS. It is planned to enable HTTPS once
              deployed. It is strongly recommended not to use sensitive
              passwords or those used on other sites.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold">Data Retention Period</h2>
            <p>Inactive accounts for over 12 months may be deleted.</p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold">User Rights</h2>
            <p>In accordance with GDPR, you have the following rights:</p>
            <ul className="list-disc pl-5">
              <li>Access to your data</li>
              <li>Rectification or deletion of your data</li>
              <li>Withdrawal of consent</li>
              <li>Filing complaints with the CNIL</li>
            </ul>
            <p>
              Contact: <strong>baris.gunay.pro@gmail.com</strong>
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold">Use of Cookies</h2>
            <p>
              Only one cookie (refresh token) is used to manage authentication.
              It is not used for tracking or analytics purposes.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold">Advertisements</h2>
            <p>No ads are displayed on this site.</p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold">Terms of Use (ToU)</h2>
            <ol className="list-decimal pl-5">
              <li>
                <strong>Purpose of the site:</strong> Demonstration project
                showcasing my full-stack development skills.
              </li>
              <li>
                <strong>Responsible use:</strong> It is prohibited to use this
                site for illegal or harmful purposes.
              </li>
              <li>
                <strong>Security:</strong> While I have taken all possible
                measures to protect accounts, please note that this site is for
                training purposes and does not guarantee professional-level
                security. Therefore, it is recommended to avoid using sensitive
                data.
              </li>
              <li>
                <strong>Intellectual property:</strong> The code and design are
                the property of the creator.
              </li>
              <li>
                <strong>Limitation of liability:</strong> The author disclaims
                all responsibility for technical issues.
              </li>
              <li>
                <strong>Modifications:</strong> Terms may change, please check
                them regularly.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-semibold">Contact</h2>
            <p>
              For any questions: <strong>baris.gunay.pro@gmail.com</strong>
            </p>
          </section>
        </>
      )}
    </div>
  );
}

export default About;
