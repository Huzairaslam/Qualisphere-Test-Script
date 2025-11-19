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
        - generic [ref=e28]:
          - textbox "* E mail" [ref=e31]:
            - /placeholder: name@gmail.com
          - alert [ref=e33]:
            - generic [ref=e34]: Please enter your email!
      - generic [ref=e36]:
        - generic [ref=e38]:
          - text: "*"
          - generic [ref=e39]: Password
        - generic [ref=e43]:
          - textbox "* Password" [ref=e44]:
            - /placeholder: 6+ characters
            - text: Admin123!@#
          - img "eye-invisible" [ref=e46] [cursor=pointer]:
            - img [ref=e47]
      - link "Forgot password?" [ref=e51] [cursor=pointer]:
        - /url: /
      - button "Login" [active] [ref=e57] [cursor=pointer]:
        - generic [ref=e58]: Login
```