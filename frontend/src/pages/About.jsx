import React from "react";

function About() {
  return (
    <div className="container mx-auto p-4">
      <section className="mb-6">
        <h2 className="text-2xl font-semibold">Avertissement Important</h2>
        <p>
          Ce site a été créé dans le cadre d'un projet personnel pour
          m'entraîner et améliorer mes compétences en développement web. Bien
          que j'ai pris soin de respecter les normes de sécurité et de
          confidentialité, il est important de noter que ce site est destiné à
          des fins d'apprentissage uniquement. Veuillez ne pas divulguer
          d'informations sensibles ou confidentielles lors de son utilisation.
          Merci de votre compréhension et de votre coopération ! 😊
        </p>
      </section>

      <h1 className="text-2xl font-bold mb-4">Mentions Légales</h1>
      <section className="mb-6">
        <h2 className="text-xl font-semibold">Éditeur du site</h2>
        <p>
          <strong>Lorga</strong> est un projet personnel développé et édité par{" "}
          <strong>Baris GUNAY</strong>, dans le but de m'entraîner à créer un
          site fullstack. Ce projet est purement démonstratif et éducatif.
        </p>
        <p>
          Contact : <strong>baris.gunay.pro@gmail.com</strong>
        </p>
        <p>
          Hébergeur : OVH SAS, 9 Rue du Bass. de l'Industrie, 67000 Strasbourg,
          France.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">Politique de Confidentialité</h2>
        <p>
          <strong>Données collectées :</strong> Ce site collecte uniquement les
          informations strictement nécessaires à l'authentification :
        </p>
        <ul className="list-disc pl-5">
          <li>Une adresse e-mail et pseudonyme</li>
          <li>Un mot de passe (chiffré et sécurisé)</li>
          <li>
            Un refresh token (cookie utilisé pour gérer la session utilisateur,
            sert à renouveler le token d'accès qui lui sert à accéder aux
            ressources protégées)
          </li>
        </ul>
        <p>
          <strong>Finalité des données :</strong> Ces données servent
          exclusivement à l’authentification. Aucune donnée n'est partagée avec
          des tiers.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">Sécurité des données</h2>
        <p>
          J'ai utilisé tout ce qui est en mon pouvoir pour sécuriser l'accès aux
          comptes des utilisateurs. Cependant, lors du lancement initial, ce
          site peut ne pas utiliser HTTPS systématiquement. Toutefois, il est
          prévu que le site soit configuré pour utiliser HTTPS une fois déployé.
          Il est fortement déconseillé d’utiliser des mots de passe sensibles ou
          que vous utilisez sur d’autres sites.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">Durée de conservation</h2>
        <p>
          Les comptes inactifs depuis plus de 12 mois peuvent être supprimés.
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
            <strong>But du site :</strong> Projet démonstratif illustrant mes
            compétences en développement fullstack.
          </li>
          <li>
            <strong>Utilisation responsable :</strong> Il est interdit
            d’utiliser ce site à des fins illégales ou nuisibles.
          </li>
          <li>
            <strong>Sécurité :</strong> J'ai pris toutes les mesures possibles
            pour protéger les comptes, cependant, veuillez noter que ce site est
            à but d'entraînement et ne garantit pas une sécurité
            professionnelle. Par conséquent, il est recommandé d'éviter
            d'utiliser des données sensibles.
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
    </div>
  );
}

export default About;
