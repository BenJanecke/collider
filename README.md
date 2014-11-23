# ATOMIC-DESIGN-ROLLER

## Getting Started

```
  npm install
  gulp collide
  gulp serve
  visit http://localhost:3000/style-guide.html
  Thats It :) 
```

## What is the roller?

This is a simple generator for a styleguide and its related css

Given a directory tree like this

```
/-style
  /-atoms
  /-molecules
  /-organisms
  /-pages
  /-templates
```

When you want to do something like create a atom for a input

```
/-style
  /-atoms
    /-fancy-input
      -fancy-input.scss
      -fancy-input.html
```

You put the scss file, documentation and the html example in the same folder.

Then when you render generate the styleguide the following should appear

```
<p>
  // documentation and description for input
</p>
<div id="fancy-input"> 
  // html example for the fancy input
</div>
```
