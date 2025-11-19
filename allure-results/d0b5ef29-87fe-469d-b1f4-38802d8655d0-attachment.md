# Page snapshot

```yaml
- main [ref=e5]:
  - generic [ref=e6]:
    - img "Background" [ref=e7]
    - heading "Welcome to QC Audit Management Software" [level=1] [ref=e12]:
      - text: Welcome to
      - text: QC Audit
      - text: Management
      - text: Software
  - generic [ref=e18]:
    - img "SMH Global Logo" [ref=e20]
    - heading "Let's Get Started" [level=3] [ref=e21]
    - text: Login to continue to your account.
    - generic [ref=e22]:
      - generic [ref=e24]:
        - generic [ref=e26]:
          - text: "*"
          - generic [ref=e27]: E mail
        - textbox "* E mail" [ref=e31]:
          - /placeholder: name@gmail.com
      - generic [ref=e33]:
        - generic [ref=e35]:
          - text: "*"
          - generic [ref=e36]: Password
        - generic [ref=e40]:
          - textbox "* Password" [ref=e41]:
            - /placeholder: 6+ characters
          - img "eye-invisible" [ref=e43] [cursor=pointer]:
            - img [ref=e44]
      - link "Forgot password?" [ref=e48] [cursor=pointer]:
        - /url: /
      - button "Login" [ref=e54] [cursor=pointer]:
        - generic [ref=e55]: Login
```