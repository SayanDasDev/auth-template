import {
  Html,
  Head,
  Preview,
  Body,
  Section,
  Container,
  Img,
  Text,
  Heading,
  Hr,
  Row,
  Column,
  Link,
  Markdown,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

interface PasswordResetEmailProps {
  appName: string;
  appImageUrl: string;
  twoFACode: string;
  supportEmail: string;
}

export const PasswordResetEmail = ({
  appName,
  twoFACode,
  appImageUrl,
  supportEmail,
}: PasswordResetEmailProps) => {
  const previewText = `Securiy Code for your ${appName} account`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans px-2">
          <Container className="border bg-[#FFE3EE] border-solid border-[#eaeaea] rounded-lg my-[40px] mx-auto p-[20px] shadow-md max-w-[465px]">
            <Section className="mt-[32px]">
              <Img
                src={appImageUrl}
                width="64"
                height="64"
                alt={appName}
                className="my-0 mx-auto"
              />
            </Section>
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              Login Attempt for <strong>{appName}</strong>
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
              Dear user,
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              We recently detected a login attempt to your{" "}
              <strong>{appName}</strong> account.
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              To ensure the security of your account, we&apos;ve enabled
              Two-Factor Authentication (2FA).
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              <strong>If you requested this login</strong>, please use the
              following code to complete the login process:
            </Text>
            <Section className="text-center bg-[#FFF1F3] rounded-md leading-4 py-[16px] mt-[32px] mb-[32px]">
              <Text className="tracking-[0.75rem] text-[32px] text-[#FF2A6C]">
                <strong>{twoFACode}</strong>
              </Text>
            </Section>
            <Text className="text-black text-[14px] leading-[24px] mb-2">
              <strong>If you did NOT request this login:</strong>
              <Markdown
                markdownContainerStyles={{
                  fontSize: "14px",
                }}
                markdownCustomStyles={{
                  ul: {marginTop: "4px"},
                }}
              >
                - **DO NOT** enter any codes. Your account may be compromised.&#13;
                - We recommend immediately changing your password using a secure
                device you recognize. You can do this by logging in to your
                account settings on a trusted device. &#13; - Consider enabling
                a stronger 2FA method, like an authenticator app, for increased
                security.
              </Markdown>
            </Text>
            <Text className="text-black text-[14px] leading-[24px] mb-2">
              <strong>Important:</strong>
              <Markdown
                markdownContainerStyles={{
                  fontSize: "14px",
                }}
                markdownCustomStyles={{
                  ul: {marginTop: "4px"},
                }}
              >
                - This 2FA code is only valid for **10 minutes**.&#13;
                - Never share your 2FA code with anyone. &#13; 
                - If you continue to experience issues logging in, contact our support team.
              </Markdown>
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              Thank you for choosing <strong>{appName}</strong>.
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              Best regards,
              <br />
              <strong>The {appName} Team</strong>
            </Text>
            <Hr className="border border-solid border-[#FF2A6C] mt-[30px] mb-[26px] mx-0 w-full" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              If you have any questions or need assistance, feel free to reach
              out to our support team at{" "}
              <span className="text-[#FF2A6C]">{supportEmail}</span>.
            </Text>
          </Container>
          <Section className="max-w-[580px] my-0 mx-auto">
            <Row>
              <Row>
                <Column
                  align="right"
                  style={{ width: "48%", paddingRight: "8px" }}
                >
                  <Link href="https://github.com/SayanDasDev">
                    <Img
                      className="w-7 h-7"
                      src={`https://raw.githubusercontent.com/SayanDasDev/images/main/github-icon-email.png`}
                    />
                  </Link>
                </Column>
                <Column align="left" style={{ width: "4%", padding: "0 8px" }}>
                  <Link href="https://www.linkedin.com/in/das-sayan/">
                    <Img
                      className="w-7 h-7"
                      src={`https://raw.githubusercontent.com/SayanDasDev/images/main/linkedin-icon-email.png`}
                    />
                  </Link>
                </Column>
                <Column
                  align="left"
                  style={{ width: "48%", paddingLeft: "8px" }}
                >
                  <Link href="https://dev.sayandas.me/">
                    <Img
                      className="w-7 h-7"
                      src={`https://raw.githubusercontent.com/SayanDasDev/images/main/portfolio-icon-email.png`}
                    />
                  </Link>
                </Column>
              </Row>
              <Text className="text-center text-[#706a7b]">
                © 2022 {appName}, All Rights Reserved <br />
                171/9 Madhyapara, Khardaha, Kolkata, West Bengal 700117
              </Text>
            </Row>
          </Section>
        </Body>
      </Tailwind>
    </Html>
  );
};

PasswordResetEmail.PreviewProps = {
  appName: "Auth-T",
  twoFACode: "123456",
  supportEmail: "mesayan19@gmail.com",
  appImageUrl:
    "https://raw.githubusercontent.com/SayanDasDev/images/main/auth-template.png",
} as PasswordResetEmailProps;

export default PasswordResetEmail;
