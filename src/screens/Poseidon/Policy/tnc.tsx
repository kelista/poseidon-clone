import React, { useEffect, useState, useContext, useMemo } from 'react';
import { StyleSheet, Text, View, StatusBar, TextInput, Image, ImageBackground, ImageSourcePropType, StyleProp, ViewStyle, ImageStyle, Dimensions } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import {
  NavigationScreenComponent,
} from "react-navigation";
import { ROUTES } from "../../../../routes";
import { CustomHeader } from "../../../components/Header"
import { CustomheaderLogo } from "../../../components/HeaderLogo"
import { BottomNavigation } from "../../../components/BottomNavigation"
import PolicyStyle from "../../../styles/Policy"
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { BackCardAnimation } from "../../../components/BackCardAnimation";

export const PoseidonTnc: NavigationScreenComponent<any, any> = (props) => {
  const { navigate } = props.navigation;

  const accountHandler = () => {
    // stopBacksound()
    navigate(ROUTES.PoseidonAccount);
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
      <StatusBar barStyle="light-content" />
      <View style={{flex: 1}}>
        <CustomheaderLogo name="TnC" lobby={() => accountHandler()}></CustomheaderLogo>
        <ScrollView>
          {/* <BackCardAnimation></BackCardAnimation> */}
          <View style={PolicyStyle.PolicyContainer}>
            <View style={PolicyStyle.PolicyTitle}>
              <Text style={PolicyStyle.PolicyTitleText}>Terms & Conditions</Text>
            </View>
            <View style={PolicyStyle.PolicyBody}>
              <Text style={PolicyStyle.PolicyBodyText}>
                These terms and conditions of use (the "Agreement") should be read by you in their entirety prior to your use of the online poker service called Poseidon ("Poseidon"). Please note that the Agreement constitutes a legally binding agreement between you and Poseidon (referred to herein as "Poseidon" or "us", a company incorporated in Singapore, and with registered office in Singapore.</Text>
              <Text style={PolicyStyle.PolicyBodyText}>
                By entering into this Agreement, you acknowledge that the trademark Poseidon (the "Brand") is owned by Poseidon Company and licensed to Poseidon in Singapore. As such, where used and the context allows, the term "Rights Holders" means us, Poseidon, RIHL and its group companies.
              </Text>
              <Text style={PolicyStyle.PolicyBodyText}>
                By entering into this Agreement, you acknowledge that the trademark Poseidon (the "Brand") is owned by Poseidon Company and licensed to Poseidon in Singapore. As such, where used and the context allows, the term "Rights Holders" means us, Poseidon, RIHL and its group companies.</Text>
              <Text style={PolicyStyle.PolicyBodyText}>
                Poseidon is the licensee in Singapore of the Brand and poker platform containing various skill game based services, including the Poseidon, at www.pokerstars.in (the "Site") and it hereby offers the Poseidon to you on the terms and conditions governing your use of the Poseidon set out below.</Text>
              <Text style={PolicyStyle.PolicyBodyText}>
                In addition to this Agreement, please review our End User License Agreement, Privacy Policy, the Poker Rules, the Real Money Processing and Currency Exchange terms and conditions and the Stars Rewards terms and conditions as well as the other rules, policies and terms and conditions relating to the games and promotions available on the Site as posted on the Site from time to time, which are incorporated herein by reference, together with such other policies of which you may be notified of by us from time to time.</Text>
              <Text style={PolicyStyle.PolicyBodyText}>
                Please note that Poseidon is designed to replicate the poker experience you would have with your friends at home. You are therefore likely to be playing a poker game with people you know, some or all of whom may be playing from the same physical location. It is your responsibility to ensure that it is legal for you to play Poseidon before you do so.</Text>
              <Text style={PolicyStyle.PolicyBodyText}>
                Be aware that the Rights Holders shall not bear any responsibility nor shall it incur any liability in connection with the conduct of any Poseidon user violating the terms and conditions of this Agreement or any other policy or rule specified by the Rights Holders in connection with Poseidon.</Text>
              <Text style={PolicyStyle.PolicyBodyText}>
                In consideration of Poseidon allowing you to use Poseidon, by clicking the "I Agree" button as part of the software installation process and using Poseidon, you consent to the terms and conditions set forth in this Agreement, including without limitation the disclaimer of liability set forth above, the End User License Agreement, the Privacy Policy, Poker Rules, the Real Money Processing and Currency Exchange terms and conditions and the Stars Rewards terms and conditions from time to time in accordance with the provisions below and therein.
              </Text>
              <Text style={PolicyStyle.PolicyBodyText}>
                Poseidon provides you with the opportunity to invite your friends and close community members to play poseidon games regardless of where they are in the world. The essence of Poseidon means that you can choose to compete in ring games and tournaments, across a huge variety of poker variants allowing you to experience the convenience, competition and fun in playing online poseidon games with people you know. Your use of Poseidon should contribute to and be consistent with the essence of Poseidon. Player data, rankings, club statistics and many other game results ("Data Tools") are provided via Poseidon, all with the sole aim of furthering your social and competitive experience amongst your friends or close community members. None of the Data Tools nor any information deriving from such Data Tools may be used or provided to any Club Manager, Member or other third party for any financial benefit. Poseidon reserves the right, in case it finds or suspects any abuse of the essence of Poseidon or that any Data Tool, or information derived from any Data Tool, is being used by you or has been used by you for any financial benefit, to suspend your use of Poseidon and/or to close the related Club at any time, in its sole discretion.</Text>
              <Text style={PolicyStyle.PolicyBodyText}>
                1. DEFINITIONS AND INTERPRETATION 
              </Text>
              <Text style={PolicyStyle.PolicyBodyText}>
                Defined terms used in the End User License Agreement shall have the same meanings in this Agreement.
              </Text>
              <Text style={PolicyStyle.PolicyBodyText}>
                The following words and phrases used in this Agreement shall have the following meanings (unless the context clearly requires otherwise):
              </Text>
              <Text style={PolicyStyle.PolicyBodyText}>
                "Administrator" means a Club Manager or a Member who has been granted the ability to arrange and cancel Poseidon Games, configure the parameters of Poseidon Games, schedule the start times of Poseidon Games, and otherwise act in an administrative capacity in relation to Poseidon Games; {"\n"}{"\n"}
                "Club" means a poker club established by a User using Poseidon;{"\n"}{"\n"}
                "Club Manager" means a User who establishes a Club;{"\n"}{"\n"}
                "HG Game" means a game of online poker using Poseidon;{"\n"}{"\n"}
                "HG Tournament" means an HG Game which is a tournament; and{"\n"}{"\n"}
                "Member" means a User who is a member of a Club but is not the Club Manager.{"\n"}{"\n"}
                For the purposes of the End User License Agreement:
              </Text>
              <Text style={PolicyStyle.PolicyBodyText}>
                you are a User; {"\n"}{"\n"}
                Poseidon is a Game;{"\n"}{"\n"}
                the poker platform licensed to Poseidon in relation to Poseidon forms part of the Software;{"\n"}{"\n"}
                the word and logo marks for "HOME GAMES" are Trade Marks; and{"\n"}{"\n"}
                any login details connected with Poseidon including account numbers, Club and User Ids, Club invitation codes and Poseidon passwords are Login Credentials.{"\n"}{"\n"}
                A phrase introduced by the term "including", "includes", "include" or "for example" means "including without limitation" and shall not limit the sense of the words preceding that term.{"\n"}{"\n"}
                Words importing the singular include the plural and vice versa, and words importing a gender shall include all genders.
              </Text>
              <Text style={PolicyStyle.PolicyBodyText}>
                2. AUTHORITY
              </Text>
              <Text style={PolicyStyle.PolicyBodyText}>
                Poseidon retains authority over the:
              </Text>
              <Text style={PolicyStyle.PolicyBodyText}>
                opening, maintaining and closing of Clubs; {"\n"}{"\n"}
                granting, maintaining or removing of Club Manager status; {"\n"}{"\n"}
                granting, maintaining or removing of Member status; and {"\n"}{"\n"}
                granting, maintaining or removing of Administrator status. {"\n"}{"\n"}
                The decision of Poseidon' management with respect to any aspect of a Club, or your use of Poseidon (including your Club and membership status) is final, and shall not be open to review or appeal.{"\n"}{"\n"}
              </Text>
              <Text style={PolicyStyle.PolicyBodyText}>
                3. RESPONSIBILITIES OF CLUB MANAGER
              </Text>
              <Text style={PolicyStyle.PolicyBodyText}>
                1. If you are a Club Manager you must read and comply with all explanations, instructions and guidelines concerning Poseidon provided on the Site from time to time.
              </Text>
              <Text style={PolicyStyle.PolicyBodyText}>
                2. Club Managers are ambassadors for the Brand and must project the best image for the Brand and Poseidon, both to Members and to the general public. You must not act in any manner which in our opinion brings or is likely to bring any of Rights Holders into disrepute or is materially adverse to the interests of any of the Rights Holders
              </Text>
              <Text style={PolicyStyle.PolicyBodyText}>
                In addition, if you are a Club Manager you agree that you will:
              </Text>
              <Text style={PolicyStyle.PolicyBodyText}>
                operate the Club responsibly and in good faith;{"\n"}{"\n"}
                without limiting your obligations under the End User License Agreement, protect your User account and access to Club management features from unauthorized use (we strongly recommend employing our RSA security token); {"\n"}{"\n"}
                provide front line support to Members for help on Club-related issues (excluding disputes between Members), and use all reasonable endeavours to resolve such issues (with the assistance of Poseidon’s support team where necessary); {"\n"}{"\n"}
                be the first point of contact for all disputes between Members relating to your Club and use all reasonable endeavours to resolve such disputes without recourse to Poseidon; {"\n"}{"\n"}
                treat Members fairly and with respect; {"\n"}{"\n"}
                respect the privacy of Members and only process their personal data in accordance with our Privacy Policy and the Information Technology Act 2000;{"\n"}{"\n"}
                use the Member blocking tool judiciously and only block Members after you have given due consideration for the well-being of the Club;{"\n"}{"\n"}
                for each Club of which you are Club Manager nominate one of its Members to be your successor in the event that you leave the Club or otherwise become unable to perform your responsibilities as Club Manager;{"\n"}{"\n"}
                immediately advise us of any known or suspected fraud, chip-dumping, collusion, money laundering or other behaviour which is illegal or is prohibited by us (as specified in this Agreement, the End User License Agreement, or otherwise on or via the Site) of which you become aware in relation to your Club; and{"\n"}{"\n"}
                comply with all reasonable directions given to you by Poseidon in relation to your Club’s, your and (to the extent that it is under your control) your Members’ use of Poseidon.{"\n"}{"\n"}
                On establishing a Club, the Club Manager must choose a Club name and logo. Once approved, the Club name may not be changed unless it is subsequently determined that the name is not compliant with Clause 3.5.
              </Text>
              <Text style={PolicyStyle.PolicyBodyText}>
                In addition to Clause 3.4 the Club Manager must not choose a Club name, logo or image which:
              </Text>
              <Text style={PolicyStyle.PolicyBodyText}>
                is offensive, unlawful, obscene, indecent, abusive, pornographic, libellous, defamatory, threatening, is liable to incite racial hatred or is blasphemous;{"\n"}{"\n"}
                infringes the intellectual property or other rights of any of the Rights Holders or any third party or violates any law;{"\n"}{"\n"}
                incorporates a URL of any kind;{"\n"}{"\n"}
                incorporates another User’s ID (in a derogatory manner);{"\n"}{"\n"}
                incorporates the name of a poker professional or any other celebrity (unless it is also your own name or such person is the Club Manager or a Member of your Club);{"\n"}{"\n"}
                includes any special characters; or{"\n"}{"\n"}
                contains the name or promotes the services of a competitor of Poseidon.{"\n"}{"\n"}
                Without derogating from Clauses 3.4 and 3.5 above, all Club names and logos are subject to review and approval by Poseidon. Poseidon reserves the right in its discretion to reject any Club name, logo or image at any time without needing to specify the reasons for the rejection.{"\n"}{"\n"}
              </Text>
              <Text style={PolicyStyle.PolicyBodyText}>
                The Club Manager must not engage in spamming or other intrusive techniques to solicit Members. Each Club Manager is solely responsible for the content of emails sent by him.{"\n"}{"\n"}
                Club Managers are not permitted to charge Members a fee for joining a Club.
              </Text>
              <Text style={PolicyStyle.PolicyBodyText}>
                4. RESPONSIBILITIES OF MEMBER
              </Text>
              <Text style={PolicyStyle.PolicyBodyText}>
                If you are a Member you agree that you will:
              </Text>
              <Text style={PolicyStyle.PolicyBodyTextList}>
                act responsibly and in good faith in your capacity as Member; {"\n"} {"\n"}
                treat other Members fairly and with respect; {"\n"}{"\n"}
                respect the privacy of other Members and only process their personal data in accordance with our Privacy Policy and the Information Technology Act 2000; {"\n"} {"\n"}
                protect your User account and access to Club management features from unauthorized use (we strongly recommend employing our RSA security token);{"\n"}{"\n"}
                make your Club Manager your first point of contact for all queries, concerns and disputes relating to your Club;{"\n"}{"\n"}
                immediately advise us of any suspected fraud, chip-dumping, collusion, money laundering or other behaviour which is illegal or is prohibited by us (as specified in this Agreement, the End User License Agreement, or otherwise on or via the Site) of which you become aware in relation to your Club; and{"\n"}{"\n"}
                not act in any manner which in our opinion brings or is likely to bring any of the Rights Holders into disrepute or is materially adverse to the interests of any of the Rights Holders.{"\n"}{"\n"}
                To the extent that you invite other people to join your Club, as a Member you must not engage in spamming or other intrusive techniques to solicit Members, including but not limited to unsolicited advertising within other Clubs. Each Member is solely responsible for the content of emails sent by him.{"\n"}{"\n"}
              </Text>
              <Text style={PolicyStyle.PolicyBodyText}>
                5. ADVERTISING
              </Text>
              <Text style={PolicyStyle.PolicyBodyText}>
                You shall not use Poseidon to promote any service or product of any party except the Rights Holder's (for example by linking to the websites of third parties or displaying the advertising of third parties), or in any way encourage Members to play online poker on the websites of the Rights Holders' competitors.
              </Text>
              <Text style={PolicyStyle.PolicyBodyText}>
                You are not permitted to post links on or otherwise link from the Site or any part of it (including those parts of the Site connected with your Club) to any third party website that promotes a competitor of the Rights Holders, suggests an association, approval or endorsement of the Club on the part of the Rights Holders, or violates any term of this Agreement or the End User Licence Agreement.
              </Text>
              <Text style={PolicyStyle.PolicyBodyText}>
                You may link to the Site from any website that is owned by you, or in an email sent by you, provided that (i) you do so in a way which is fair and legal and does not damage our reputation or take advantage of it, and (ii) you do not suggest any form of association, approval or endorsement on our part where none exists. Your right to link pursuant to this Clause 5.3 cannot be sub-licensed, assigned or otherwise transferred by you. We reserve the right to withdraw this right to link at any time.
              </Text>
              <Text style={PolicyStyle.PolicyBodyText}>
                6. FINANCIAL GAIN
              </Text>
              <Text style={PolicyStyle.PolicyBodyText}>
                Poseidon is intended solely for your personal entertainment (whether you use it as a Club Manager or Member) and must not in any way be used to create any financial gain or other pecuniary advantage to you or to any other User of Poseidon. Prohibited conduct in connection with use of Poseidon includes (but is not limited to) the following:
              </Text>
              <Text style={PolicyStyle.PolicyBodyText}>
                setting up an escrow account or any other method, scheme or system, whether online or offline, in order to distribute funds to any person based on the results of any Poseidon ring game or tournament; {"\n"}{"\n"}
                charging or receiving from any Member a fee for joining the Club; or{"\n"}{"\n"}
                without derogating from Clauses 5.1 or 5.2, earning money or gaining any other form of remuneration from advertising revenue.{"\n"}{"\n"}
              </Text>
              <Text style={PolicyStyle.PolicyBodyText}>
                7. PRIVACY AND IDENTITY
              </Text>
              <Text style={PolicyStyle.PolicyBodyText}>
                You acknowledge and accept that a HG Game is likely to include players who know each other, and some or all of those players may be playing that HG Game from the same physical location. By your acceptance of this Agreement, you confirm and agree that it is legal for you to participate in Poseidon in your jurisdiction.
              </Text>
              <Text style={PolicyStyle.PolicyBodyText}>
                Your Poseidon player account User ID will also be your Club Manager or Member identifier, and will be displayed to the Club Manager and Members in the Poseidon lobby, Club lobby and (if the Club Manager opts-in for inclusion in directories) public directories of Clubs. Thus, people who know you through Poseidon and/or your Club will also know the identity of your Poseidon player account User ID. If you do not agree to this, you must not use Poseidon. Users are not permitted to have more than one, unique User ID.
              </Text>
              <Text style={PolicyStyle.PolicyBodyText}>
                Poseidon may review Club chat logs for any purpose including to check your compliance with this Agreement and the End User License Agreement.
              </Text>
              <Text style={PolicyStyle.PolicyBodyText}>
                Your personal information may be shared with third parties if we suspect that you are involved in Fraudulent Behaviour (as defined in Clause 9.1 below). However, in sharing such information we shall comply with the Privacy Policy.
              </Text>
              <Text style={PolicyStyle.PolicyBodyText}>
                Your personal information may be shared with third parties if we suspect that you are involved in Fraudulent Behaviour (as defined in Clause 9.1 below). However, in sharing such information we shall comply with the Privacy Policy.
              </Text>
              <Text style={PolicyStyle.PolicyBodyText}>
                You agree to accept emails from us relating to your Club activities, including schedules for Poseidon Games, results and standings. You may opt out from receiving such emails at any time on a Club-by-Club basis. Please note that, unless you opt out from a particular Club’s emails, you will receive these emails even if you have opted out of receiving promotional or other emails in relation to the Site.
              </Text>
              <Text style={PolicyStyle.PolicyBodyText}>
                8. SYSTEM MAINTENANCE
              </Text>
              <Text style={PolicyStyle.PolicyBodyText}>
                You acknowledge and accept that a HG Game is likely to include players who know each other, and some or all of those players may be playing that HG Game from the same physical location. By your acceptance of this Agreement, you confirm and agree that it is legal for you to participate in Poseidon in your jurisdiction.
              </Text>
              <Text style={PolicyStyle.PolicyBodyText}>
                Poseidon may from time to time suspend Poseidon in order to perform necessary maintenance (or for any other reason permitted by the End User License Agreement), although if possible we will give you notice of such suspension. In the event of such suspension, it may be necessary to cancel scheduled Poseidon Games. The Club Manager has no responsibility for any such suspension.
              </Text>
              <Text style={PolicyStyle.PolicyBodyText}>
                If you are a Member, you acknowledge that the suspension described in Clause 8.1 is beyond the Club Manager’s control. Notwithstanding this, if you have any queries about suspension you should refer to your Club Manager in the first instance.
              </Text>
              <Text style={PolicyStyle.PolicyBodyText}>
                If you are a Club Manager, you agree to take prime responsibility for dealing with Member queries relating to any suspension described in Clause 8.1.
              </Text>
              <Text style={PolicyStyle.PolicyBodyText}>
                You may unregister from an HG Tournament any time up until two minutes before its scheduled start time. You will forfeit your buy-in if you fail to play an agreed HG Tournament without unregistering in time, and Poseidon will not refund you.
              </Text>
              <Text style={PolicyStyle.PolicyBodyText}>
                9. FRAUDULENT BEHAVIOUR
              </Text>
              <Text style={PolicyStyle.PolicyBodyText}>
                Poseidon allows you to use Poseidon on the basis that you will not commit any fraud or dishonesty. You agree that you will not commit, or procure, encourage, assist or support the committal of, any fraud or dishonesty or other behaviour which is illegal or prohibited by us (as specified in this Agreement, the End User License Agreement, or otherwise on or via the Site) in relation to a Club or the use of Poseidon ("Fraudulent Behaviour").
              </Text>
              <Text style={PolicyStyle.PolicyBodyText}>
                Poseidon takes Fraudulent Behaviour extremely seriously. In addition to any other rights or remedies Poseidon may have under this Agreement, the End User License Agreement, at law or otherwise, any User found to be involved in Fraudulent Behaviour may be reported to the relevant authorities.
              </Text>
              <Text style={PolicyStyle.PolicyBodyText}>
                The Club Manager must reasonably monitor the activities of his Club for evidence of Fraudulent Behaviour, and report to Support any known or suspected Fraudulent Behaviour in accordance with the provisions of Clause 3.3.
              </Text>
              <Text style={PolicyStyle.PolicyBodyText}>
                Without limiting Clause 9.3, each Member must be alert to evidence of Fraudulent Behaviour relating to his Club and must report to Support any known or suspected Fraudulent Behaviour in accordance with the provisions of Clause 4.1 (f).
              </Text>
              <Text style={PolicyStyle.PolicyBodyText}>
                10. SUSPENSION AND BREACH
              </Text>
              <Text style={PolicyStyle.PolicyBodyText}>
                In the event that we believe you may be in breach of any provision of this Agreement or the End User License Agreement, or for any other justifiable reason, the Rights Holders reserve the right (without prejudice to their other rights or remedies under this Agreement, the End User License Agreement, at law or otherwise) to immediately:
              </Text>
              <Text style={PolicyStyle.PolicyBodyText}>
                suspend or prevent your access to the Site or any part of it, including without limitation any Club of which you are a Club Manager or Member or Poseidon in general;{"\n"}{"\n"}
                suspend or cancel any HG Game or any other activity relating to a Club; {"\n"}{"\n"}
                suspend the operation of a Club; and/or{"\n"}{"\n"}
                close a Club.{"\n"}{"\n"}
                In the event that you are found to be in breach of any provision of this Agreement or the End User License Agreement, the Rights Holders reserve the right (without prejudice to their other rights or remedies under this Agreement, the End User License Agreement, at law or otherwise) to immediately:{"\n"}{"\n"}
              </Text>
              <Text style={PolicyStyle.PolicyBodyText}>
                terminate this Agreement; {"\n"}{"\n"}
                suspend or permanently prevent your access to the Site or any part of it, including without limitation any Club of which you are a Club Manager or Member or Poseidon in general;{"\n"}{"\n"}
                suspend or cancel any HG Game or any other activity relating to a Club;{"\n"}{"\n"}
                suspend the operation of or permanently close a Club;{"\n"}{"\n"}
                seize all monies held in your User account;{"\n"}{"\n"}
                terminate your User account;{"\n"}{"\n"}
                take legal action against you; and/or{"\n"}{"\n"}
                take any other action Poseidon sees fit.{"\n"}{"\n"}
              </Text>
              <Text style={PolicyStyle.PolicyBodyText}>
                11. LIABILITY AND INDEMNITY
              </Text>
              <Text style={PolicyStyle.PolicyBodyText}>
                You agree to fully indemnify, defend and hold harmless the Rights Holders and their shareholders, directors and employees from and against all claims, demands, liabilities, damages, losses, costs and expenses, including legal fees and any other charges whatsoever, howsoever caused, that may arise as a result of:
              </Text>
              <Text style={PolicyStyle.PolicyBodyText}>
                in connection with Poseidon, any violation or infringement or alleged violation or infringement by you of any law or any third party rights;{"\n"}{"\n"}
                any Fraudulent Behaviour or alleged Fraudulent Behaviour with which you were involved in connection with Poseidon; and{"\n"}{"\n"}
                use by you of Poseidon or use by any other person accessing Poseidon using your Login Credentials, whether or not with your authorization.{"\n"}{"\n"}
                Under no circumstances, including negligence, shall Poseidon or its service providers be liable for any special, incidental, direct, indirect or consequential damages whatsoever (including damages for loss of business profits, business interruption, loss of business information, or any other pecuniary loss) arising out of or in connection with this Agreement, even if Poseidon and/or its service providers had prior knowledge of the possibility of such damages or if such losses were reasonably foreseeable.{"\n"}{"\n"}
              </Text>
              <Text style={PolicyStyle.PolicyBodyText}>
                12. AMENDMENT
              </Text>
              <Text style={PolicyStyle.PolicyBodyText}>
                Poseidon reserves the right to update or modify this Agreement or any part thereof at any time without notice and you will be bound by such amended Agreement 14 days after it was posted at the Site, unless communicated and instructed otherwise. Therefore, we encourage you to visit the Site regularly and check the terms and conditions contained in the version of the Agreement in force at such time. Your continued use of the Site shall be deemed to attest to your agreement to any amendments to the Agreement.
              </Text>
              <Text style={PolicyStyle.PolicyBodyText}>
                13. GOVERNING LAW
              </Text>
              <Text style={PolicyStyle.PolicyBodyText}>
                This Agreement and any matters relating hereto shall be governed, interpreted by, and construed in accordance with the laws of Singapore. All disputes, differences, complaints etc., shall be subject to Arbitration under the Singaporen Arbitration and Conciliation Act, 1996. The arbitrator will be appointed by Poseidon. The place of arbitration shall be Mumbai, Maharashtra, Singapore. Subject to arbitration as provided above, the courts at Mumbai shall have the exclusive jurisdiction.
              </Text>
              <Text style={PolicyStyle.PolicyBodyText}>
                14. SEVERABILITY
              </Text>
              <Text style={PolicyStyle.PolicyBodyText}>
                If a provision of this Agreement is or becomes illegal, invalid or unenforceable in any jurisdiction, that shall not affect the validity or enforceability in that jurisdiction of any other provision hereof or the validity or enforceability in other jurisdictions of that or any other provision hereof.
              </Text>
              <Text style={PolicyStyle.PolicyBodyText}>
                15. ASSIGNMENT
              </Text>
              <Text style={PolicyStyle.PolicyBodyText}>
                Poseidon and/or the Rights Holders, as applicable, reserve the right to transfer/assign their rights or obligations under this Agreement to any of their group companies or any other legal entity (including but not limited to instances where any of the Rights Holders restructures their business or if there is a sale of their business). You agree that the Rights Holders may do so provided that in the case of a transfer/assignment, after the applicable Rights Holder/s notifies you of the date on which they transfer/assign their rights and obligations under this Agreement, your rights in connection with this Agreement will be against the new legal entity. This Agreement is personal to you and you shall not transfer your rights or obligations under this Agreement to anyone else.
              </Text>
              <Text style={PolicyStyle.PolicyBodyText}>
                16. MISCELLANEOUS
              </Text>
              <Text style={PolicyStyle.PolicyBodyText}>
                No waiver (express or implied) by the Rights Holders of any breach of any provision of this Agreement (including the failure of the Rights Holders to require strict and literal performance of or compliance with any provision of this Agreement) shall in any way be construed as a waiver of any subsequent breach of such provision or of any breach of any other provision of this Agreement.
              </Text>
              <Text style={PolicyStyle.PolicyBodyText}>
                Nothing in this Agreement shall create or confer any rights or other benefits in favour of any person who is not party to this Agreement (including any Club Manager or Member of your Club other than you).
              </Text>
              <Text style={PolicyStyle.PolicyBodyText}>
                Nothing in this Agreement shall create or be deemed to create an employment, partnership, agency, trust arrangement, fiduciary relationship or joint venture between you and us.
              </Text>
              <Text style={PolicyStyle.PolicyBodyText}>
                This Agreement and the documents referred to in it constitute the entire understanding and agreement between you and us regarding Poseidon and supersede any prior agreement, understanding, or arrangement between you and us relating to Poseidon.
              </Text>
              <Text style={PolicyStyle.PolicyBodyText}>
                You must provide full and truthful information in respect of all details and information requested by Poseidon in connection with your use of Poseidon and, if you are a Club Manager, your Club’s Members’ use of Poseidon, subject at all times to the terms of the Privacy Policy.
              </Text>
              <Text style={PolicyStyle.PolicyBodyText}>
                The English language version of this Agreement shall be the prevailing version in the event of any discrepancy between any translated versions of this Agreement.
              </Text>
            </View>
          </View>
          <View style={PolicyStyle.PolicyBlankSpace}></View>
        </ScrollView>
        <BottomNavigation home={() => navigate(ROUTES.PoseidonLobby)} setting={() => navigate(ROUTES.PoseidonAccount)} status={'room'} liveScore={() => closeOpenStatement()}>
        </BottomNavigation>
      </View>
    </SafeAreaView>
  );
};
