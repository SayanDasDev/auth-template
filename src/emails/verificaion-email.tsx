import {
  Html,
  Button,
  Head,
  Preview,
  Body,
  Section,
  Container,
  Img,
  Text,
  Heading,
  Link,
  Hr,
  Row,
  Column,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";
import * as React from "react";

interface VerificationEmailProps {
  appName: string;
  appImageUrl: string;
  verificationLink: string;
  supportEmail: string;
}

export const VerificationEmail = ({
  appName,
  verificationLink,
  appImageUrl,
  supportEmail,
}: VerificationEmailProps) => {
  const previewText = `Join ${appName}`;

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
              Verify your email address!
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
              Dear user,
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              Thank you for signing up for <strong>{appName}</strong>!
              We&apos;re excited to have you on board. To complete the
              registration process and start exploring all the features of our
              app, please click the button below to verify your account:
            </Text>
            <Section className="text-center mt-[32px] mb-[32px]">
              <Button
                className="bg-[#000000] rounded-lg text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                href={verificationLink}
              >
                Verify Email
              </Button>
            </Section>
            <Text className="text-black text-[14px] leading-[24px]">
              This verification link is valid for <strong>10 minutes.</strong>
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              By verifying your account, you ensure the security of your
              information and gain full access to{" "}
              <strong>{appName}&apos;s</strong> functionalities.
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              If the above button does not work, please copy and paste the
              following URL into your web browser:
            </Text>
            <Link
              href={verificationLink}
              className="text-blue-600 no-underline"
            >
              {verificationLink}
            </Link>
            <Text className="text-black text-[14px] leading-[24px]">
              Thank you for choosing <strong>{appName}</strong>.
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              If you did not create an account with us, please ignore this
              email. Your account will remain inactive.
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

VerificationEmail.PreviewProps = {
  appName: "Auth-T",
  verificationLink: "https://localhost:3000/verify-email",
  supportEmail: "mesayan19@gmail.com",
  appImageUrl:
    "https://raw.githubusercontent.com/SayanDasDev/images/main/auth-template.png",
} as VerificationEmailProps;

export default VerificationEmail;
