# Ghost Theme Documentation - Complete Reference

This comprehensive documentation covers all aspects of Ghost theme development, compiled from the official Ghost documentation.

## Table of Contents

1. [Introduction](#introduction)
2. [Theme Structure](#theme-structure)
3. [Contexts](#contexts)
4. [Assets](#assets)
5. [Helpers](#helpers)
   - [Functional Helpers](#functional-helpers)
   - [Data Helpers](#data-helpers)
   - [Utility Helpers](#utility-helpers)
6. [Content](#content)
7. [Search](#search)
8. [Members](#members)
9. [Routing](#routing)
10. [Custom Settings](#custom-settings)
11. [GScan](#gscan)

---

## Introduction

Ghost themes use the Handlebars templating language which creates a strong separation between templates (the HTML) and any JavaScript logic with the use of helpers. This allows themes to be super fast, with a dynamic client side app, and server side publication content that is sent to the browser as static HTML. <mcreference link="https://docs.ghost.org/themes" index="1">1</mcreference>

Ghost also makes use of an additional library called express-hbs which adds some additional features to Handlebars, such as layouts and partials. <mcreference link="https://docs.ghost.org/themes" index="1">1</mcreference>

If you've previously built themes for other popular platforms, working with the Ghost theme layer is extremely accessible. This documentation gives you the tools required to create static HTML and CSS for a theme, using Handlebars expressions when you need to render dynamic data. <mcreference link="https://docs.ghost.org/themes" index="1">1</mcreference>

### Custom Settings

Offering customization options to theme users can be done using custom settings. This allows theme developers to empower non-developers to make controlled changes. <mcreference link="https://docs.ghost.org/themes" index="1">1</mcreference>

### GScan Validation

Validating your Ghost theme is handled efficiently with the GScan tool. GScan will check your theme for errors, deprecations and compatibility issues. <mcreference link="https://docs.ghost.org/themes" index="1">1</mcreference>

- The GScan site is your first port of call to test any themes that you're building to get a full validation report
- When a theme is uploaded in Ghost admin, it will automatically be checked with gscan and any fatal errors will prevent the theme from being used
- gscan is also used as a command line tool

#### Command Line Usage

To use GScan as a command line tool, globally install the gscan npm package: <mcreference link="https://docs.ghost.org/themes" index="1">1</mcreference>

```bash
# Install the npm package
npm install -g gscan

# Use gscan <file path> anywhere to run gscan against a folder
gscan /path/to/ghost/content/themes/casper

# Run gscan on a zip file
gscan -z /path/to/download/theme.zip
```

---

## Theme Structure

The recommended file structure for a Ghost theme is: <mcreference link="https://docs.ghost.org/themes/structure" index="2">2</mcreference>

```
.
├── /assets
|   └── /css
|       ├── screen.css
|   ├── /fonts
|   ├── /images
|   ├── /js
├── default.hbs
├── index.hbs [required]
└── post.hbs [required]
└── package.json [required]
```

An optional `/partials` directory allows you to use partial templates across your site to share blocks of HTML between multiple templates and reduce code duplication: <mcreference link="https://docs.ghost.org/themes/structure" index="2">2</mcreference>

```
.
├── /assets
    ├── /css
        ├── screen.css
    ├── /fonts
    ├── /images
    ├── /js
├── /partials
    ├── list-post.hbs
├── default.hbs
├── index.hbs [required]
└── post.hbs [required]
└── package.json [required]
```

### Templates

Two template files are required: `index.hbs` and `post.hbs`. All other templates are optional. <mcreference link="https://docs.ghost.org/themes/structure" index="2">2</mcreference>

It's recommended using a `default.hbs` file as a base layout for your theme. If you have significantly different layouts for different pages or content types, use the dynamic routing configuration layer, or use partials to encapsulate common parts of your theme. <mcreference link="https://docs.ghost.org/themes/structure" index="2">2</mcreference>

Theme templates are hierarchical, so one template can extend another template. This prevents base HTML from being repeated. <mcreference link="https://docs.ghost.org/themes/structure" index="2">2</mcreference>

#### Template Types

**default.hbs** <mcreference link="https://docs.ghost.org/themes/structure" index="2">2</mcreference>
- Base template that contains the boring bits of HTML that exist on every page such as `<html>`, `<head>` or `<body>`
- Contains the required `{{ghost_head}}` and `{{ghost_foot}}` helpers
- Includes any HTML for the header and footer

**index.hbs** <mcreference link="https://docs.ghost.org/themes/structure" index="2">2</mcreference>
- Standard required template for a list of posts
- Used if your theme does not have a `tag.hbs`, `author.hbs` or `home.hbs` template
- Usually extends `default.hbs` and is passed a list of posts using the `{{#foreach}}` helper

**home.hbs** <mcreference link="https://docs.ghost.org/themes/structure" index="2">2</mcreference>
- Optional template to provide special content for the home page
- Only used to render `/`

**post.hbs** <mcreference link="https://docs.ghost.org/themes/structure" index="2">2</mcreference>
- Required template for a single post
- Extends `default.hbs` and uses the `{{#post}}` helper to output post details
- Custom templates for individual posts can be created using `post-:slug.hbs`

**page.hbs** <mcreference link="https://docs.ghost.org/themes/structure" index="2">2</mcreference>
- Optional template for static pages
- If not specified then `post.hbs` will be used
- Custom templates for individual pages can be mapped using `page-:slug.hbs`

**custom-{{template-name}}.hbs** <mcreference link="https://docs.ghost.org/themes/structure" index="2">2</mcreference>
- Optional custom templates that can be selected in the admin interface on a per-post basis
- Can be used for both posts and pages

**tag.hbs** <mcreference link="https://docs.ghost.org/themes/structure" index="2">2</mcreference>
- Optional template for tag archive pages
- If not specified the `index.hbs` template is used
- Custom templates for individual tags can be created using `tag-:slug.hbs`

**author.hbs** <mcreference link="https://docs.ghost.org/themes/structure" index="2">2</mcreference>
- Optional template for author archive pages
- If not specified the `index.hbs` template is used
- Custom templates for individual authors can be created using `author-:slug.hbs`

**private.hbs** <mcreference link="https://docs.ghost.org/themes/structure" index="2">2</mcreference>
- Optional template for the password form page on password protected publications

**error.hbs** <mcreference link="https://docs.ghost.org/themes/structure" index="2">2</mcreference>
- Optional theme template for any 404 or 500 errors that are not otherwise handled by error- or class-specific templates
- If one is not specified Ghost will use the default

**error-{{error-class}}.hbs** <mcreference link="https://docs.ghost.org/themes/structure" index="2">2</mcreference>
- Optional theme template for errors belonging to a specific class (e.g. `error-4xx.hbs` for 400-level errors)
- A matching error class template is prioritized over both `error.hbs` and the Ghost default template

**error-{{error-code}}.hbs** <mcreference link="https://docs.ghost.org/themes/structure" index="2">2</mcreference>
- Optional theme template for status code-specific errors (e.g. `error-404.hbs`)
- A matching error code template is prioritized over all other error templates

**robots.txt** <mcreference link="https://docs.ghost.org/themes/structure" index="2">2</mcreference>
- Themes can include a robots.txt which overrides the default robots.txt provided by Ghost

### Required Helpers

Ghost templates are constructed from HTML and handlebars helpers. In order for a Ghost theme to work, you must make use of the required helpers: <mcreference link="https://docs.ghost.org/themes/structure" index="2">2</mcreference>
- `{{asset}}`
- `{{body_class}}`
- `{{post_class}}`
- `{{ghost_head}}`
- `{{ghost_foot}}`

### Development Mode

It is recommended to use a local install to build a custom theme using development mode. In production mode, template files are loaded and cached by the server. For any changes in a hbs file to be reflected, use the `ghost restart` command. <mcreference link="https://docs.ghost.org/themes/structure" index="2">2</mcreference>

---

## Contexts

A Ghost publication follows a structure that allows URLs or routes to be mapped to views which display specific data. This data could be a list of posts, a single post or an RSS feed. It is the route that determines what data is meant to be shown and what template is used to render it. <mcreference link="https://docs.ghost.org/themes/contexts" index="1">1</mcreference>

Rather than providing access to all data in all contexts, Ghost optimises what data is fetched using contexts to ensure publications are super fast! <mcreference link="https://docs.ghost.org/themes/contexts" index="1">1</mcreference>

### Using Contexts

Contexts play a big part in the building blocks of a Ghost theme. Besides determining what data is available and what template to render, contexts also interact with handlebars helpers, since the context also determines what dynamic data the helper outputs. <mcreference link="https://docs.ghost.org/themes/contexts" index="1">1</mcreference>

For example, the `{{meta_title}}` helper outputs different things based on the current context. If the context is post then the helper knows it can use `post.meta_title` and in a tag context it uses `tag.meta_title`. <mcreference link="https://docs.ghost.org/themes/contexts" index="1">1</mcreference>

To detect a context in your theme, use the `{{#is}}` helper. For example, in a partial template that is shared between many contexts, using `{{#is}}` passes it a context and only executes the contained block when it is in that context. <mcreference link="https://docs.ghost.org/themes/contexts" index="1">1</mcreference>

### List of Contexts

- **index** - Main post listing context
- **page** - Static page context
- **post** - Individual post context
- **author** - Author archive context
- **tag** - Tag archive context
- **error** - Error page context

---

## Routing

Ghost's routing configuration is defined in `content/settings/routes.yaml` which can be edited directly or uploaded/downloaded from Ghost admin under Settings » Labs. <mcreference link="https://docs.ghost.org/themes/routing" index="1">1</mcreference>

### Default Configuration

The default `routes.yaml` sets up a traditional publication structure: <mcreference link="https://docs.ghost.org/themes/routing" index="1">1</mcreference>

```yaml
routes:

collections:
  /:
    permalink: /{slug}/
    template: index

taxonomies:
  tag: /tag/{slug}/
  author: /author/{slug}/
```

### Custom Routes

Template routes allow mapping individual URLs to specific template files: <mcreference link="https://docs.ghost.org/themes/routing" index="1">1</mcreference>

```yaml
routes:
  /features/: features
  /about/team/: team
```

### Loading Data

Routes can load data from Ghost pages using the `data` property: <mcreference link="https://docs.ghost.org/themes/routing" index="1">1</mcreference>

```yaml
routes:
  /about/team/:
    template: team
    data: page.team
```

### YAML Guidelines

- Uses 2-space indentation for nesting <mcreference link="https://docs.ghost.org/themes/routing" index="1">1</mcreference>
- Manual file edits require Ghost restart
- Admin uploads update routes automatically

## Assets

Ghost themes use the `/assets` directory for static files: <mcreference link="https://ghost.org/docs/themes/structure/" index="3">3</mcreference>

### Recommended Structure

```
/assets
├── /css
│   ├── screen.css
├── /fonts
├── /images
├── /js
```

### Required Helpers

Themes must use these required helpers: <mcreference link="https://ghost.org/docs/themes/structure/" index="3">3</mcreference>
- `{{asset}}` - for linking to theme assets
- `{{body_class}}` - for context-specific CSS classes
- `{{post_class}}` - for post-specific CSS classes
- `{{ghost_head}}` - for Ghost's head content
- `{{ghost_foot}}` - for Ghost's footer content

## Helpers

Helpers add additional functionality to Handlebars templating. <mcreference link="https://ghost.org/docs/themes/helpers/" index="1">1</mcreference>

### Functional Helpers

Functional helpers work with data objects: <mcreference link="https://ghost.org/docs/themes/helpers/" index="1">1</mcreference>

#### `{{#get}}`

Makes custom queries to the Ghost API to fetch publicly available data: <mcreference link="https://ghost.org/docs/themes/helpers/get/" index="2">2</mcreference>

**Basic Usage:**
```handlebars
{{#get "posts"}}
    {{#foreach posts}}
        {{title}}
    {{/foreach}}
{{/get}}
```

**Available Resources:**
- `posts` - any published post
- `tags` - any tag with associated posts
- `authors` - any author who has published posts
- `tiers` - any membership tier
- `newsletters` - any newsletter

**Attributes:**
- `limit` - How many items to return (1-100, default: 15)
- `page` - Which page of results to get
- `order` - Sort order (e.g., "published_at asc")
- `include` - Expand returned data (e.g., "tags,authors")

**Block Parameters:**
```handlebars
{{#get "posts" as |articles pages|}}
    {{#foreach articles}}
        {{title}}
    {{/foreach}}
    {{pages.total}}
{{/get}}
```

#### `{{#foreach}}`

Loop helper for iterating over lists with data variables like `@index`, `@number`, `@first`, `@last`, `@odd`, `@even`.

#### `{{#is}}`

Checks the context of the current route: <mcreference link="https://docs.ghost.org/themes/contexts" index="5">5</mcreference>

```handlebars
{{#is "post"}}
    <h1>This is a post</h1>
{{/is}}

{{#is "home, paged"}}
    <h1>This is home or paged</h1>
{{/is}}
```

**Available Contexts:** `home`, `post`, `page`, `tag`, `author`, `paged`, `private`

### Data Helpers

Data helpers output data from your site: <mcreference link="https://ghost.org/docs/themes/helpers/" index="1">1</mcreference>

#### `{{content}}`

Outputs post content with proper HTML formatting: <mcreference link="https://ghost.org/docs/themes/helpers/content/" index="4">4</mcreference>

```handlebars
{{content}} <!-- Full content -->
{{content words="100"}} <!-- Limited to 100 words -->
```

For members-enabled sites, shows upgrade/sign up CTA for restricted content.

### Utility Helpers

Utility helpers perform minor, optional tasks: <mcreference link="https://ghost.org/docs/themes/helpers/" index="1">1</mcreference>

#### `{{encode}}`

URL-encodes strings, useful for share links.

#### `{{search}}`

Outputs a search button with search icon: <mcreference link="https://ghost.org/docs/themes/search/" index="5">5</mcreference>

## Content

Ghost content is managed through contexts and helpers. The `{{content}}` helper is the primary way to output post content: <mcreference link="https://ghost.org/docs/themes/helpers/content/" index="4">4</mcreference>

### Content Limitations

- `{{content words="100"}}` - Limits output to 100 words with properly matched HTML tags
- For member-only content, shows default upgrade/sign up CTA to non-members

## Search

Ghost provides built-in search functionality: <mcreference link="https://ghost.org/docs/themes/search/" index="5">5</mcreference>

### Implementation Methods

1. **Using the `{{search}}` helper:**
```handlebars
{{search}}
```

2. **Using data attribute:**
```html
<button class="gh-search" data-ghost-search>
    {{> "icons/search"}}
</button>
```

3. **Direct URL:** Add `#/search` to navigation

### Search Features

- Searches post titles and excerpts from most recent 10,000 posts
- Excludes excerpts for member-only posts
- Keyboard shortcut: Cmd/Ctrl + K
- Requires taxonomies for tags and authors to be present

### Advanced Search with Algolia

For sites with >10,000 posts or complex requirements: <mcreference link="https://ghost.org/docs/themes/search/" index="5">5</mcreference>
- Use Algolia Ghost CLI to pre-populate search index
- Set up Algolia Netlify Functions for automatic updates
- Processes webhook events to keep index current

## Members

The Members feature allows you to turn any site into a membership business with member signup, paid subscriptions and email newsletters. <mcreference link="https://ghost.org/docs/themes/members/" index="1">1</mcreference>

### Portal Integration

Members can be activated using any theme by using the Portal feature — an embeddable memberships feature that can be enabled and customised from the Admin UI. <mcreference link="https://ghost.org/docs/themes/members/" index="1">1</mcreference>

#### Portal Links

Portal screens can be accessed via URLs or data attributes:

```html
<!-- Absolute URLs take readers to homepage and open Portal -->
<a href="https://example.com/#/portal/signup">Subscribe</a>

<!-- Relative URLs open Portal on current page -->
<a href="#/portal/signup">Subscribe</a>
```

#### Data Attributes

When using the `data-portal` data attribute, additional classes `gh-portal-open` and `gh-portal-close` are added to the element for custom styling. <mcreference link="https://ghost.org/docs/themes/members/" index="1">1</mcreference>

### Signup Forms

Create custom signup forms using data attributes:

```html
<!-- Basic signup form -->
<form data-members-form>
  <input data-members-email type="email" required="true"/>
  <button type="submit">Continue</button>
</form>

<!-- Form with name capture -->
<form data-members-form>
  <label>
    Name
    <input data-members-name />
  </label>
  <label>
    Email
    <input data-members-email type="email" required="true"/>
  </label>
  <button type="submit">Subscribe</button>
</form>

<!-- Error handling -->
<p data-members-error></p>
```

#### Newsletter Subscriptions

Subscribe members to specific newsletters:

```html
<!-- Subscribe to specific newsletter -->
<form data-members-form>
  <input data-members-email type="email" required="true"/>
  <input data-members-newsletter type="hidden" value="Weekly Threads" />
  <button type="submit">Subscribe</button>
</form>

<!-- Multiple newsletters -->
<form data-members-form>
  <input data-members-email type="email" required="true"/>
  <input data-members-newsletter type="hidden" value="Weekly Threads" />
  <input data-members-newsletter type="hidden" value="Shocking Revelations" />
  <button type="submit">Subscribe</button>
</form>

<!-- User choice with checkboxes -->
<form data-members-form>
  <input data-members-email type="email" required="true"/>
  <label>
    Newsletter Name
    <input data-members-newsletter type="checkbox" value="Newsletter Name" />
  </label>
  <label>
    Newsletter Two
    <input data-members-newsletter type="checkbox" value="Newsletter Two" />
  </label>
  <button type="submit">Subscribe</button>
</form>
```

#### Dynamic Newsletter Forms

Create dynamic forms using the `{{#get}}` helper:

```handlebars
<form data-members-form>
  <input type="email" required data-members-email>
  {{#get "newsletters"}}
    {{#foreach newsletters}}
      <label>
        <input type="checkbox" value="{{name}}" data-members-newsletter />
        {{name}}
      </label>
    {{/foreach}}
  {{/get}}
  <button type="submit">Subscribe</button>
</form>
```

#### Form Options

Customize form behavior with additional attributes:

- `data-members-form="signin"` – sends signin email to existing members
- `data-members-form="signup"` – sends signup email to new members
- `data-members-form="subscribe"` – sends subscribe email
- `data-members-autoredirect="false"` – controls redirect behavior after login

#### Form States

Forms pass through different states reflected as CSS classes:

```html
<form data-members-form class="loading">...</form>
<form data-members-form class="success">...</form>
<form data-members-form class="error">...</form>
```

### Member Authentication

#### Sign Out

Provide sign out functionality:

```html
<a href="javascript:" data-members-signout>Sign out</a>

<!-- Conditional display -->
{{#if @member}}
  <a href="javascript:" data-members-signout>Sign out</a>
{{else}}
  <a href="#/portal/signin">Sign in</a>
{{/if}}
```

### Tiers and Pricing

#### {{tiers}} Helper

Format tier names in ascending order by price: <mcreference link="https://ghost.org/docs/themes/helpers/tiers/" index="2">2</mcreference>

```handlebars
{{tiers}}
{{! output: "bronze, silver and gold tiers" }}

{{tiers prefix="Access with:"}}
{{! output: "Access with: bronze, silver and gold tiers" }}

{{tiers separator=" | "}}
{{! output: "bronze | silver and gold tiers" }}

{{tiers lastSeparator=" plus "}}
{{! output: "bronze, silver plus gold tiers" }}

{{tiers suffix="options"}}
{{! output: "bronze, silver and gold options" }}
```

#### Fetching Tier Data

Use `{{#get}}` to fetch detailed tier information:

```handlebars
{{#get "tiers" include="monthly_price,yearly_price,benefits" limit="100" as |tiers|}}
  {{#foreach tiers}}
    {{name}}
    {{#if monthly_price}}
      <div>
        <a href="javascript:" data-portal="signup/{{id}}/monthly">
          Monthly – {{price monthly_price currency=currency}}
        </a>
      </div>
    {{/if}}
    {{#if benefits}}
      {{#foreach benefits as |benefit|}}
        {{benefit}}
      {{/foreach}}
    {{/if}}
  {{/foreach}}
{{/get}}
```

### @site Member Data

Access member-related site settings: <mcreference link="https://ghost.org/docs/themes/helpers/site/" index="5">5</mcreference>

```handlebars
{{@site.allow_self_signup}} <!-- True if new members can sign up -->
{{@site.comments_access}} <!-- Level required to comment (all, paid, off) -->
{{@site.comments_enabled}} <!-- True if comments enabled -->
{{@site.members_enabled}} <!-- True if subscription access not "Nobody" -->
{{@site.members_invite_only}} <!-- True if "Only people I invite" -->
{{@site.members_support_address}} <!-- Email for member support -->
{{@site.paid_members_enabled}} <!-- True if members enabled and Stripe connected -->
{{@site.portal_button_icon}} <!-- Custom Portal button icon URL -->
{{@site.portal_button_signup_text}} <!-- Portal button signup text -->
{{@site.portal_button_style}} <!-- Portal button style -->
{{@site.portal_button}} <!-- True if Portal button enabled -->
{{@site.portal_name}} <!-- True if name field in signup form -->
{{@site.portal_plans}} <!-- Portal plan names -->
{{@site.portal_signup_checkbox_required}} <!-- True if agreement required -->
{{@site.portal_signup_terms_html}} <!-- HTML of signup terms -->
{{@site.signup_url}} <!-- URL for member signup -->
```

#### Example Usage

```handlebars
{{#unless @site.members_invite_only}}
  <form data-members-form>
    <input data-members-email type="email" required="true"/>
    <button type="submit">Continue</button>
  </form>
{{/unless}}
```

### Content Access Control

With the `{{content}}` helper, visitors without access see a default call-to-action instead of restricted content. The default CTA can be overridden by providing a `./partials/content-cta.hbs` template file. <mcreference link="https://ghost.org/docs/themes/members/" index="1">1</mcreference>

## Custom Settings

Custom settings allow theme developers to provide customization options to theme users, empowering non-developers to make controlled changes to their themes without touching code.

### Configuration

Custom settings are defined in the theme's `package.json` file under the `config.custom` object:

```json
{
  "config": {
    "custom": {
      "navigation_layout": {
        "type": "select",
        "options": ["Logo on the left", "Logo in the middle", "Stacked"],
        "default": "Logo on the left"
      },
      "typography_style": {
        "type": "select",
        "options": ["Modern sans-serif", "Elegant serif", "Minimal"],
        "default": "Modern sans-serif"
      },
      "show_publication_cover": {
        "type": "boolean",
        "default": true,
        "group": "homepage"
      },
      "footer_text": {
        "type": "text",
        "default": "A beautiful publication"
      },
      "publication_cover_style": {
        "type": "color",
        "default": "#ffffff"
      }
    }
  }
}
```

### Setting Types

- **`select`**: Dropdown with predefined options
- **`boolean`**: True/false toggle
- **`text`**: Single line text input
- **`color`**: Color picker

### Using Custom Settings in Templates

Access custom settings in your Handlebars templates using the `@custom` helper:

```handlebars
{{#is @custom.navigation_layout "Logo in the middle"}}
  <header class="site-header centered">
{{else}}
  <header class="site-header">
{{/is}}

{{#if @custom.show_publication_cover}}
  <div class="publication-cover" style="background-color: {{@custom.publication_cover_style}}">
    <!-- Cover content -->
  </div>
{{/if}}

<footer>
  <p>{{@custom.footer_text}}</p>
</footer>
```

### Grouping Settings

Organize related settings using the `group` property:

```json
{
  "show_author_bio": {
    "type": "boolean",
    "default": true,
    "group": "post"
  },
  "post_image_style": {
    "type": "select",
    "options": ["Full width", "Boxed", "Rounded"],
    "default": "Full width",
    "group": "post"
  }
}
```

## GScan

GScan is Ghost's official theme validation tool that checks themes for errors, deprecations, and compatibility issues. It ensures themes follow Ghost's standards and work correctly across different Ghost versions.

### Online Validation

The easiest way to validate your theme is using the GScan website:

1. Visit [gscan.ghost.org](https://gscan.ghost.org)
2. Upload your theme ZIP file
3. Review the validation report
4. Fix any errors or warnings

### Command Line Usage

Install GScan globally as an npm package:

```bash
# Install GScan globally
npm install -g gscan

# Validate a theme folder
gscan /path/to/your/theme

# Validate a ZIP file
gscan -z /path/to/theme.zip

# Check for specific Ghost version compatibility
gscan /path/to/theme --canary
```

### Validation Results

GScan categorizes issues into different levels:

- **Errors**: Critical issues that prevent theme activation
- **Warnings**: Issues that should be fixed but don't prevent activation
- **Recommendations**: Best practice suggestions for optimization

### Common Validation Issues

#### Missing Required Files
```
GS001-DEPRV-01: package.json must be present
GS005-TPL-01: index.hbs template must be present
GS005-TPL-02: post.hbs template must be present
```

#### Missing Required Helpers
```
GS030-ASSET-REQ: {{asset}} helper must be used
GS040-GH-REQ: {{ghost_head}} helper must be used
GS040-GF-REQ: {{ghost_foot}} helper must be used
```

#### Deprecated Features
```
GS050-CSS-KGWW: Deprecated CSS classes detected
GS060-JS-KGWW: Deprecated JavaScript patterns found
```

### Automatic Validation

When uploading themes through Ghost Admin, GScan automatically runs validation:

- **Fatal errors** prevent theme activation
- **Warnings** are displayed but allow activation
- **Recommendations** are shown for improvement

### Integration with Development

Add GScan to your development workflow:

```json
// package.json scripts
{
  "scripts": {
    "test": "gscan .",
    "zip": "npm run test && zip -r theme.zip . -x node_modules/\* .git/\*"
  }
}
```

### Best Practices

1. **Run GScan regularly** during development
2. **Fix errors immediately** - they prevent theme activation
3. **Address warnings** for better compatibility
4. **Follow recommendations** for optimal performance
5. **Test with different Ghost versions** using version flags
6. **Keep themes updated** with latest Ghost features and requirements