---
title: Weakform DC Resistivity Derivation
description: Deriving the discretized equations for the weakform direct current resistivity equations.
date: 2014-02-13
tags: ['thought', 'icare']
thumbnail: /images/weakform-dc/1d-mesh.png
---

```python
from SimPEG import Mesh
mesh = Mesh.TensorMesh([10, 10])
```

## Discretizing Equation (1)

:::{note} Note
\mathbf{M}_\frac{1}{\sigma} \mathbf{j} = - \mathbf{D}^\top\text{diag}(\mathbf{v})\phi + \mathbf{P}_{bc}\phi\_{bc}
:::

## Discretizing Equation (2)

For equation (2) the integration with a general cell function $w$ results in:

```
<ink-equation>\left(\nabla\cdot \vec{j}, w\right) = \left(q, w\right)</ink-equation>

Or equivalently:

<ink-equation>\int \nabla\cdot \vec{j} w dv = \int q w dv</ink-equation>

Discretizing the divergence operator as the matrix $\mathbf{D}$ this results in the following:

<ink-equation>\mathbf{j}^\top\mathbf{D}^\top\text{diag}(\mathbf{v})\mathbf{w} = \mathbf{q}^\top\text{diag}(\mathbf{v})\mathbf{w}</ink-equation>

or the transpose (which is the same because it is a scalar!):

<ink-equation>\mathbf{w}^\top\text{diag}(\mathbf{v})\mathbf{D}\mathbf{j} = \mathbf{w}^\top\text{diag}(\mathbf{v})\mathbf{q}</ink-equation>

This can be further simplified by eliminating the $\mathbf{w}^\top\text{diag}(\mathbf{v})$ from both sides of the equations.

The discretized matrix equation is very similar to the original equation (2):

<ink-equation>\mathbf{D}\mathbf{j} = \mathbf{q}</ink-equation>

However, we may want to enforce Neumann boundary conditions on $\mathbf{j}$, which requires a few tweaks in our matrix equations. We can do this using projection matrices!
```

`python" icare="=5D = mesh.faceDiv`

:::{note} Note
\mathbf{D}\mathbf{P}_{in}^\top\mathbf{P}_{in}\mathbf{j} + \mathbf{D}\mathbf{P}_{out}^\top\mathbf{j}_{bc} = \mathbf{q}
:::

## Putting the Equations Together

Care needs to be taken when putting these equations together to ensure that the boundary conditions match. The natural boundary conditions that occur in this system using a cell-centered discretization are homogeneous Dirichlet. In the DC resistivity problem, however, we are often interested in homogeneous Neumann boundary conditions.

```
In descrete equation we need to make sure that the divergence that we apply on the general face function $\mathbf{f}^\top$ match those of the DC resistivity equations. Here we will rewrite the integration and make a few notes:

<ink-equation>
  \int \nabla \phi \cdot \vec{f}  dv =
    - \int \phi \nabla \cdot \vec{f}  dv
  + \oint_{\partial \Omega} \phi \vec{f}\cdot\vec{n} ds
</ink-equation>
```

```
In this case we note that $\vec{f}\cdot\vec{n} = 0 \in \partial\Omega$ and the $\nabla\cdot\vec{f}$ must enforce the correct boundary conditions. In the discretized form this translates to using the projected divergence matrix and dropping the boundary condition term for $\phi_{bc}$. We can plug the projected divergence matrix into descrete equation and rearrange to solve for $\mathbf{j}$:

<ink-equation>\mathbf{j} =
- \mathbf{M}_{\frac{1}{\sigma}}^{-1}\mathbf{P}_{in}^\top\mathbf{P}_{in}\mathbf{D}^\top\text{diag}(\mathbf{v})\phi</ink-equation>

We can substitute this into descrete equation by defining $\mathbf{D}_{in} = \mathbf{D}\mathbf{P}_{in}^\top\mathbf{P}_{in}$:

<ink-equation>-\mathbf{D}_{in}\mathbf{M}_{\frac{1}{\sigma}}^{-1}\mathbf{D}_{in}^\top\text{diag}(\mathbf{v})\phi +
\mathbf{D}\mathbf{P}_{out}^\top\mathbf{j}_{bc} = \mathbf{q}</ink-equation>

Here we know $\mathbf{j}_{bc}$ is zero on all of the boundaries, so we will drop that term, and multiply on the left by a $\text{diag}(\mathbf{v})$ to make the matrix symmetric.
```

:::{note} Note
\text{diag}(\mathbf{v})\mathbf{D}_{in}\mathbf{M}_{\frac{1}{\sigma}}^{-1}\mathbf{D}\_{in}^\top\text{diag}(\mathbf{v})\phi = -\text{diag}(\mathbf{v})\mathbf{q}
:::

:::{note} Note
:class: warning

**Note:**

The matrix has a null space of a constant vector! This is expected with homogeneous Neumann boundary conditions, but we need to not forget about this when we are solving the matrix system.
:::

```python
from SimPEG import Mesh, Utils, Solver
import numpy as np

M = Mesh.TensorMesh([60, 60, 10])
Pbc, Pin, Pout = mesh.getBCProjWF("neumann")
V = Utils.sdiag(mesh.vol)
Msig = mesh.getFaceInnerProduct()
MsigI = Utils.sdInv(Msig)
Din = mesh.faceDiv * Pin.T * Pin
A = V * Din * MsigI * Din.T * V

# Create the sources
q = np.zeros(mesh.vnC)
q[[30, 30], [20, 40], 5] = [-1, 1]
q = -V * Utils.mkvc(q)

# Solve the system
phi = Solver(A) * q

# Plot it!
mesh.plotSlice(-Din.T * phi, 'F', normal='Z', view='vec')
```

:::{figure} images/weakform-dc/dc.png
Slice through a DC resistivity survey showing a dipole response.
:::
